'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';

interface HeaderProps {
  onUpgradeClick?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { settings, updateSettings } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignInOut = async () => {
    if (user) {
      await signOut();
    } else {
      await signInWithGoogle();
    }
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  };

  const isPro = user?.role === 'pro';

  return (
    <header className="bg-[var(--card-bg-color)] shadow-md py-4 px-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* ЛОГОТИП */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold text-[var(--text-color)] flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="TimeCraft Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          TimeCraft
        </Link>

        {/* БУРГЕР-КНОПКА */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[var(--text-color)] focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* НАВИГАЦИЯ */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-[var(--card-bg-color)] px-4 py-4 md:static md:flex md:items-center md:space-x-4 md:p-0 md:w-auto z-40`}
        >
          <Link
            href="/dashboard"
            className="block py-2 md:py-0 text-[var(--text-color)] hover:text-[var(--link-hover-color)]"
          >
            Dashboard
          </Link>
          <Link
            href="/blog"
            className="block py-2 md:py-0 text-[var(--text-color)] hover:text-[var(--link-hover-color)]"
          >
            Blog
          </Link>
          <Link
            href="/settings"
            className="block py-2 md:py-0 text-[var(--text-color)] hover:text-[var(--link-hover-color)]"
          >
            Settings
          </Link>

          <button
            onClick={toggleTheme}
            className="block py-2 md:py-0 md:ml-2 p-2 rounded-full bg-[var(--bg-color)] text-[var(--text-color)] hover:bg-[var(--footer-bg-color)] transition-colors duration-200"
          >
            {settings.theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 3.325l-.707.707M6.364 6.364l-.707-.707m12.728 0l-.707-.707M6.364 17.636l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {!isPro && (
            <Link
              href="/pricing"
              className="block mt-2 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Upgrade to Pro
            </Link>
          )}

          <button
            onClick={handleSignInOut}
            disabled={loading}
            className="block mt-2 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            {loading ? 'Loading...' : user ? 'Sign Out' : 'Sign In'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
