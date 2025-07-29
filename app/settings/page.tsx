// app/settings/page.tsx
'use client'; // Mark as client component

import React, { useCallback } from 'react';
import SettingsPageComponent from '@/components/SettingsPage'; // Rename to avoid conflict, or adjust component name
import { useSettings } from '@/hooks/useSettings'; // Use settings context hook
import { useAuth } from '@/hooks/useAuth';
import SubscriptionModal from '@/components/SubscriptionModal'; // Alias path
import { useState } from 'react';

// You might need to adjust the SettingsPage component itself to accept props from useSettings
// Original: onThemeChange, currentTheme, onUpgradeClick
// Now: settings, updateSettings, availableSounds, onUpgradeClick (from a higher level)

export default function SettingsPage() {
  const { settings, updateSettings, availableSounds } = useSettings();
  const { upgradeToPro } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example of how to handle theme change
  const handleThemeChange = useCallback((newTheme: string) => {
    updateSettings({ theme: newTheme });
  }, [updateSettings]);

  const openUpgradeModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleUpgradeFromModal = useCallback(() => {
    upgradeToPro();
    setIsModalOpen(false);
  }, [upgradeToPro]);

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-[var(--text-color)] mb-8">
        Settings
      </h1>
      <SettingsPageComponent
        onThemeChange={handleThemeChange} // Pass the handler
        currentTheme={settings.theme} // Pass current theme from settings
        settings={settings} // Pass all settings
        updateSettings={updateSettings} // Pass update function
        availableSounds={availableSounds} // Pass available sounds
        onUpgradeClick={openUpgradeModal} // Pass a trigger for the modal
      />
      {isModalOpen && <SubscriptionModal onClose={() => setIsModalOpen(false)} onUpgrade={handleUpgradeFromModal} />}
    </>
  );
}