// app/settings/page.tsx
'use client'; // Mark as client component

import React, { useCallback, useState } from 'react';
import SettingsPageComponent from '@/components/SettingsPage';
import { useSettings } from '@/hooks/useSettings'; // Use settings context hook
import { useAuth } from '@/hooks/useAuth';
import SubscriptionModal from '@/components/SubscriptionModal';

export default function SettingsPage() {
  // Get settings and related functions from the useSettings hook
  // These are used WITHIN this component (e.g., for `currentTheme` prop, or `handleThemeChange` logic)
  // but should NOT be passed as props to SettingsPageComponent.
  const { settings, updateSettings } = useSettings(); // Still needed here to derive props for SettingsPageComponent

  const { upgradeToPro } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example of how to handle theme change, which updates the settings context
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
        currentTheme={settings.theme}     // Pass current theme from settings
        onUpgradeClick={openUpgradeModal} // Pass a trigger for the modal
        // REMOVED THE FOLLOWING PROPS as they are now consumed directly inside SettingsPageComponent via useSettings()
        // settings={settings}
        // updateSettings={updateSettings}
        // availableSounds={availableSounds}
      />
      {isModalOpen && <SubscriptionModal onClose={() => setIsModalOpen(false)} onUpgrade={handleUpgradeFromModal} />}
    </>
  );
}