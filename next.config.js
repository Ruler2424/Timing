/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ваши существующие настройки, если есть
  // experimental: {
  //   appDir: true, // Это обычно уже включено по умолчанию
  // },
};

// --- MDX НАСТРОЙКА ---
const withMDX = require('@next/mdx')(); // Вызовите @next/mdx

module.exports = withMDX(nextConfig); // Оберните ваш nextConfig с withMDX