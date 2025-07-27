// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';

interface HeaderProps {
  onUpgradeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUpgradeClick }) => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { settings, updateSettings } = useSettings();

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
    <header className="bg-[var(--card-bg-color)] shadow-md py-4 px-6 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <Image src="/logo.png" alt="TimeCraft Logo" width={40} height={40} className="rounded-full" />
            TimeCraft
        </Link>
        <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-[var(--text-color)] hover:text-[var(--link-hover-color)] transition-colors duration-200">
            Dashboard
          </Link>
          {/* НОВАЯ ССЫЛКА НА БЛОГ */}
          <Link href="/blog" className="text-[var(--text-color)] hover:text-[var(--link-hover-color)] transition-colors duration-200">
            Blog
          </Link>
          <Link href="/settings" className="text-[var(--text-color)] hover:text-[var(--link-hover-color)] transition-colors duration-200">
            Settings
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--bg-color)] text-[var(--text-color)] hover:bg-[var(--footer-bg-color)] transition-colors duration-200"
          >
            {settings.theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 3.325l-.707.707M6.364 6.364l-.707-.707m12.728 0l-.707-.707M6.364 17.636l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          {!isPro && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              onClick={onUpgradeClick}
            >
              Upgrade to Pro
            </button>
          )}
          <button
            onClick={handleSignInOut}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : user ? 'Sign Out' : 'Sign In'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;