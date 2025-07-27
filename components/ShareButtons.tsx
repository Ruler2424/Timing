// components/ShareButtons.tsx
'use client'; // Этот компонент должен быть клиентским

import React, { useState, useEffect } from 'react';

interface ShareButtonsProps {
  title: string; // Заголовок статьи
  text: string;  // Краткое описание или часть текста статьи
  url: string;   // URL статьи, которой делимся
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, text, url }) => {
  // Состояние mounted для обработки гидратации, если необходимо.
  // Хотя для этого компонента это менее критично, чем для таймеров.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="text-center text-[var(--text-muted-color)]">Loading share options...</div>;
  }

  // URL кодирование для использования в ссылках
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  // Ссылки для шеринга
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}"e=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}&source=${encodeURIComponent(window.location.origin)}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    // Можно добавить другие, например, Vkontakte, Odnoklassniki
    // vkontakte: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}&description=${encodedText}`,
    // odnoklassniki: `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodedUrl}&st.title=${encodedTitle}&st.description=${encodedText}`,
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 my-8 py-4 border-t border-b border-[var(--border-color)]">
      <span className="text-lg font-semibold text-[var(--text-color)] mr-2">Share this article:</span>
      <button
        onClick={() => openShareWindow(shareLinks.twitter)}
        className="px-4 py-2 rounded-md bg-[#1DA1F2] text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Share on Twitter"
      >
        {/* SVG для Twitter/X */}
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.21-6.174L4.99 22.25H1.68l7.73-8.825L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h-.76l-5.836-7.723-3.092 7.723H2.813L9.752 4.25h2.122l-4.706 7.723z"></path></svg>
        Twitter
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.facebook)}
        className="px-4 py-2 rounded-md bg-[#1877F2] text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Share on Facebook"
      >
        {/* SVG для Facebook */}
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z"></path></svg>
        Facebook
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.linkedin)}
        className="px-4 py-2 rounded-md bg-[#0A66C2] text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Share on LinkedIn"
      >
        {/* SVG для LinkedIn */}
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.5-.75-2.25-1.75-2.25S13 13.5 13 14.25V19h-3v-9h3V9.25c.5-.75 1.25-1.5 2.25-1.5S19 8 19 9.25z"></path></svg>
        LinkedIn
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.telegram)}
        className="px-4 py-2 rounded-md bg-[#2AABEE] text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Share on Telegram"
      >
        {/* SVG для Telegram */}
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.18 8.16l-3.32 3.22c-.17.16-.38.24-.6.24-.22 0-.43-.08-.6-.24l-1.4-1.37c-.17-.16-.26-.37-.26-.6 0-.23.09-.44.26-.6L14.06 7.6c.17-.16.38-.24.6-.24.22 0 .43.08.6.24l.95.95c.17.16.26.37.26.6 0 .23-.09.44-.26.6zM16.94 8.78c-.28-.27-.7-.27-.98 0L9.83 14.86c-.28.27-.28.71 0 .98l1.4 1.37c.28.27.7.27.98 0l6.11-5.94c.28-.27.28-.71 0-.98l-1.4-1.37z"></path></svg>
        Telegram
      </button>
      <button
        onClick={() => openShareWindow(shareLinks.whatsapp)}
        className="px-4 py-2 rounded-md bg-[#25D366] text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Share on WhatsApp"
      >
        {/* SVG для WhatsApp */}
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.63.42 3.21 1.22 4.6l-1.28 4.67 4.75-1.25c1.37.74 2.92 1.13 4.81 1.13 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.06c-1.52 0-3.03-.43-4.32-1.19l-.31-.18-3.2 1.05 1.07-3.13-.2-.33c-.76-1.28-1.16-2.73-1.16-4.24 0-4.52 3.68-8.21 8.21-8.21s8.21 3.68 8.21 8.21c-.01 4.52-3.69 8.2-8.22 8.2zm4.1-5.26c-.23-.11-.97-.47-1.12-.52-.16-.05-.28-.02-.4.11-.12.14-.46.52-.56.62-.1.11-.2.12-.39.05-.23-.08-1.16-.43-2.21-1.37-.82-.71-1.38-1.58-1.54-1.86-.16-.28-.01-.43.09-.54.09-.1.21-.26.31-.39.1-.12.14-.23.18-.31.05-.09.02-.18-.01-.25-.04-.08-.39-.93-.53-1.26-.14-.32-.29-.28-.4-.28h-.39c-.11 0-.29.04-.44.22-.16.18-.6.58-.6 1.41 0 .83.62 1.62.7 1.74.08.12 1.2 1.83 2.91 2.59 1.71.76 2.05.65 2.43.59.38-.06 1.17-.48 1.34-.94.17-.46.17-.86.12-.94-.05-.09-.16-.14-.34-.24z"></path></svg>
        WhatsApp
      </button>
      {/* Добавьте кнопки для других соцсетей по необходимости */}
    </div>
  );
};

export default ShareButtons;