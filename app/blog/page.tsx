// app/blog/page.tsx
import React from 'react';
import { getAllPostsMeta, PostMeta } from '@/lib/mdx'; // Импортируем утилиту для получения метаданных всех постов
import Link from 'next/link'; // Для навигации в Next.js
import Image from 'next/image'; // Для оптимизированных изображений (если используете обложки статей)

// Метаданные для страницы списка блога
export const metadata = {
  title: 'Blog - TimeCraft: Productivity & Time Management Insights',
  description: 'Explore articles on productivity, time management, focus techniques, and the effective use of TimeCraft\'s tools. Your ultimate guide to mastering time.',
  keywords: "productivity blog, time management articles, focus techniques, pomodoro guide, stopwatch tips, online alarm uses, TimeCraft blog",
  openGraph: {
    title: 'TimeCraft Blog: Insights for Productivity',
    description: 'Dive into our articles about effective time management, productivity strategies, and how to maximize your efficiency with TimeCraft.',
    url: 'https://timing-five.vercel.app/blog', // Замените на ваш реальный домен
    siteName: 'TimeCraft',
    images: [
      {
        url: 'https://timing-five.vercel.app/og-image-blog.png', // Создайте общую OG-картинку для блога
        width: 1200,
        height: 630,
        alt: 'TimeCraft Blog',
      },
    ],
    locale: 'en_US',
    type: 'website', // Или 'blog'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeCraft Blog: Insights for Productivity',
    description: 'Dive into our articles about effective time management, productivity strategies, and how to maximize your efficiency with TimeCraft.',
    images: ['https://timing-five.vercel.app/twitter-image-blog.png'], // Создайте общую Twitter-картинку для блога
  },
};

// Компонент страницы списка блога
export default async function BlogPage() {
  // Получаем метаданные всех постов на сервере.
  // Это Server Component, поэтому `await` здесь допустим.
  const posts: PostMeta[] = await getAllPostsMeta('blog');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-center text-4xl font-bold text-[var(--text-color)] mb-8">
        TimeCraft Blog: Insights for Productivity
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-[var(--card-bg-color)] rounded-lg shadow-md overflow-hidden 
                       transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            {/* Опциональное изображение обложки статьи, если оно указано во фронтматтере MDX */}
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={400} // Ширина и высота для Image из next/image
                height={200}
                layout="responsive" // Делает изображение адаптивным
                objectFit="cover" // Обрезает изображение, чтобы оно заполняло контейнер
                className="w-full h-48 object-cover" // Классы Tailwind для стилизации
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[var(--text-color)] mb-2">
                {/* Ссылка на отдельную статью блога */}
                <Link href={`/blog/${post.slug}`} className="hover:text-[var(--link-hover-color)] transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-[var(--text-muted-color)] mb-3">
                {/* Форматирование даты */}
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-[var(--text-color)] mb-4">
                {post.excerpt} {/* Краткое описание статьи из фронтматтера */}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Теги статьи */}
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              {/* Кнопка "Читать далее" */}
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline font-medium">
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Сообщение, если статьи не найдены */}
      {posts.length === 0 && (
        <p className="text-center text-[var(--text-muted-color)] text-lg mt-12">
          No blog posts found. Check back soon for new content!
        </p>
      )}
    </div>
  );
}