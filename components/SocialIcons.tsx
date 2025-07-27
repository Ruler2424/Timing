// components/SocialIcons.tsx
'use client'; // Это клиентский компонент

import React from 'react';
import Link from 'next/link'; // Для ссылок
// <-- ИМПОРТИРУЙТЕ ВАШИ КОМПОНЕНТЫ ИКОНОК ИЗ icons.tsx -->
import { FacebookIcon, TwitterIcon, InstagramIcon, YouTubeIcon } from './icons'; // Убедитесь, что путь верный

interface SocialIconProps {
  href: string;
  IconComponent: React.ElementType; // Теперь мы передаем сам компонент иконки
  label: string; // Для доступности
}

// Вспомогательный компонент для отдельных иконок
const SocialIcon: React.FC<SocialIconProps> = ({ href, IconComponent, label }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        className="text-[var(--footer-text-color)] hover:text-[var(--link-hover-color)] transition-colors duration-200">
    {/* Рендерим переданный компонент иконки */}
    <IconComponent className="h-6 w-6" /> {/* Передаем классы для размера */}
  </Link>
);

const SocialIcons: React.FC = () => {
  return (
    <div className="flex justify-center space-x-6">
      <SocialIcon
        href="https://facebook.com/yourprofile" // ЗАМЕНИТЕ НА СВОЙ ПРОФИЛЬ
        label="Facebook"
        IconComponent={FacebookIcon} // Передаем ваш компонент FacebookIcon
      />
      <SocialIcon
        href="https://twitter.com/yourprofile" // ЗАМЕНИТЕ НА СВОЙ ПРОФИЛЬ (или X)
        label="Twitter"
        IconComponent={TwitterIcon} // Передаем ваш компонент TwitterIcon
      />
      <SocialIcon
        href="https://instagram.com/yourprofile" // ЗАМЕНИТЕ НА СВОЙ ПРОФИЛЬ
        label="Instagram"
        IconComponent={InstagramIcon} // Передаем ваш компонент InstagramIcon
      />
      <SocialIcon
        href="https://youtube.com/yourchannel" // ЗАМЕНИТЕ НА СВОЙ КАНАЛ
        label="YouTube"
        IconComponent={YouTubeIcon} // Передаем ваш компонент YouTubeIcon
      />
      {/* Добавьте другие иконки по необходимости */}
    </div>
  );
};

export default SocialIcons;