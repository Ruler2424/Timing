// components/Footer.tsx
'use client'; // Это клиентский компонент

import React from 'react';
import Link from 'next/link'; // Для навигации
import SocialIcons from './SocialIcons'; // <-- ИМПОРТИРУЙТЕ SocialIcons

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] py-8 mt-12 transition-colors duration-300">
      <div className="container mx-auto text-center">
        {/* Раздел с иконками социальных сетей */}
        <div className="mb-4">
          <SocialIcons /> {/* <-- ИСПОЛЬЗУЙТЕ КОМПОНЕНТ ЗДЕСЬ */}
        </div>

        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/privacy" className="hover:text-[var(--link-hover-color)] transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--link-hover-color)] transition-colors duration-200">
            Terms of Use
          </Link>
          <Link href="/blog" className="hover:text-[var(--link-hover-color)] transition-colors duration-200">
            Blog
          </Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} TimeCraft. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;