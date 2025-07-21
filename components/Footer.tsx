// components/Footer.tsx
import React from 'react';
// Импортируем Link из react-router-dom
import { Link } from 'react-router-dom';
// Ваши существующие импорты иконок
import { SocialIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './icons.tsx';

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] py-6"> {/* Добавил стили из предыдущего примера для лучшего вида, если нужно */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"> {/* Изменил структуру для более гибкого размещения */}
        
        {/* Секция с копирайтом и социальными ссылками */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8"> {/* Добавил gap-8 для разделения */}
            <span className="text-slate-500">Copyright © {new Date().getFullYear()} Timing-Five. Все права защищены.</span> {/* Интегрировал копирайт */}
            <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> {/* Обычные ссылки для соц. сетей, если не требуется навигация React */}
                    <SocialIcon><FacebookIcon /></SocialIcon>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <SocialIcon><TwitterIcon /></SocialIcon>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <SocialIcon><InstagramIcon /></SocialIcon>
                </a>
            </div>
        </div>

        {/* Секция с политикой и условиями */}
        <div className="flex space-x-4">
          {/* Используем Link для внутренней навигации */}
          <Link to="/privacy" className="text-slate-500 hover:text-[var(--link-hover-color)] hover:underline">
            Политика конфиденциальности
          </Link>
          <Link to="/terms" className="text-slate-500 hover:text-[var(--link-hover-color)] hover:underline">
            Условия использования
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;