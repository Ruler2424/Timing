import React from 'react';
import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug, 'blog');

  if (!post) {
    return { title: 'Post Not Found - TimeCraft Blog' };
  }

  return {
    title: `${post.meta.title} - TimeCraft Blog`,
    description: post.meta.excerpt,
    keywords: post.meta.tags.join(', '),
    openGraph: {
      images: post.meta.image ? [post.meta.image] : [],
    },
    url: `https://timing-five.vercel.app/blog/${slug}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPostsMeta('blog');
  return posts.map(post => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { meta, content } = await getPostBySlug(slug, 'blog') || { meta: null, content: null };

  if (!meta) {
    notFound();
  }

  const articleUrl = `https://timing-five.vercel.app/blog/${slug}`;
  const articleTitle = meta.title;
  const articleDescription = meta.excerpt;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="prose max-w-none mx-auto bg-[var(--card-bg-color)] p-8 rounded-xl shadow-lg text-[var(--text-color)] transition-colors duration-300">
  <h1 className="text-5xl font-extrabold leading-tight mb-6 text-[var(--text-color)]">
    {meta.title}
  </h1>

  <p className="text-base text-[var(--text-muted-color)] mb-8 italic">
    Published on {new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
  </p>

  {/* Добавляем класс prose к обертке контента */}
  <div className="text-[var(--text-color)] prose prose-lg max-w-none mb-12">
    {content}
  </div>

  <ShareButtons title={articleTitle} text={articleDescription} url={articleUrl} />

  <Link href="/blog" className="inline-block text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors duration-200">
    ← Back to Blog
  </Link>
</article>

    </div>
  );
}
