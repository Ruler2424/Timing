// lib/mdx.ts
import fs from 'fs'; // Node.js File System module for reading files
import path from 'path'; // Node.js Path module for handling file paths
import matter from 'gray-matter'; // Library to parse frontmatter from markdown/mdx files
import { compileMDX } from 'next-mdx-remote/rsc'; // For compiling MDX content into React Server Components

// IMPORTANT: Import Next.js components that you want to use directly within your MDX files.
// These need to be passed into the `components` prop of `compileMDX`.
import Link from 'next/link';
import Image from 'next/image';

// --- Function to get a single post by its slug ---
export async function getPostBySlug(slug: string, source: 'blog' = 'blog') {
  // Construct the full path to the MDX file
  const filePath = path.join(process.cwd(), 'content', source, `${slug}.mdx`);

  // Check if the file exists before reading
  if (!fs.existsSync(filePath)) {
    console.warn(`MDX file not found: ${filePath}`);
    return null; // Return null if post doesn't exist
  }

  // Read the content of the MDX file
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Parse the frontmatter (YAML data at the top of the file) and the MDX content
  const { data, content } = matter(fileContent);

  // Compile the MDX content into a React component.
  // The `components` prop is crucial for allowing MDX to use your React components (like Link, Image).
  const { content: mdxContent, frontmatter } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true, // Tell it to parse frontmatter from the source
      mdxOptions: {
        // You can add Remark and Rehype plugins here for advanced MDX processing
        // For example: syntax highlighting, auto-linking headers, etc.
        // E.g., remarkPlugins: [require('remark-prism')],
        // rehypePlugins: [],
      },
    },
    // Pass the imported React components to be used within the MDX.
    components: {
      Link,    // Allows <Link> component to be used in MDX
      Image,   // Allows <Image> component to be used in MDX
      // You can add any other custom React components here:
      // CustomComponent: YourCustomComponent,
      // And standard HTML elements can be overridden if needed:
      // h1: (props) => <h1 className="my-class" {...props} />,
    },
  });

  return {
    meta: { ...data, slug } as PostMeta, // Cast data to PostMeta type and add slug
    content: mdxContent,                   // The compiled MDX content (React element)
  };
}

// --- Function to get metadata for all posts ---
export async function getAllPostsMeta(source: 'blog' = 'blog') {
  const dirPath = path.join(process.cwd(), 'content', source);

  // Check if the directory exists
  if (!fs.existsSync(dirPath)) {
    console.warn(`MDX content directory not found: ${dirPath}`);
    return []; // Return empty array if directory doesn't exist
  }

  // Read all files in the directory
  const files = fs.readdirSync(dirPath);

  // Filter for .mdx files and extract their metadata
  const posts = files
    .filter(file => file.endsWith('.mdx')) // Ensure we only process MDX files
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      return {
        meta: { ...data, slug: file.replace('.mdx', '') } as PostMeta,
      };
    });

  // Sort posts by date, from newest to oldest
  posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

  // Return only the metadata
  return posts.map(p => p.meta);
}

// --- Type definition for post frontmatter ---
export interface PostMeta {
  title: string;
  date: string;
  excerpt: string; // Short summary of the post
  tags: string[];
  slug: string; // The URL slug for the post
  image?: string; // Optional: path to a cover image for the post
  // Add any other frontmatter fields you use here
}