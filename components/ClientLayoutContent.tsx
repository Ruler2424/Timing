// components/ClientLayoutContent.tsx
'use client'; // This component MUST be a client component

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubscriptionModal from '@/components/SubscriptionModal';

// Re-import font variables here, so they are available in the client-side context
import { Inter, Roboto_Mono } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono', display: 'swap' });


export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  const { user, upgradeToPro } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Apply the theme class and font variables to the body element
    // Ensure all font variables and base font class are applied here.
    document.body.className = `${settings.theme} ${inter.variable} ${robotoMono.variable} font-sans`;
  }, [settings.theme, inter.variable, robotoMono.variable]); // Added font variables to dependencies

  const openUpgradeModal = () => {
    setIsModalOpen(true);
  };

  const handleUpgrade = () => {
    if (user) {
      upgradeToPro();
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onUpgradeClick={openUpgradeModal} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <Footer />
      {isModalOpen && <SubscriptionModal onClose={() => setIsModalOpen(false)} onUpgrade={handleUpgrade} />}
    </div>
  );
}