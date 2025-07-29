import './globals.css';
import { Inter, Roboto_Mono } from 'next/font/google';

import { AuthProvider } from '@/hooks/useAuth';
import { AudioProvider } from '@/utils/sounds/playSound';
import { SettingsProvider } from '@/hooks/useSettings';

import ClientLayoutContent from '@/components/ClientLayoutContent';

// The metadata is now in app/metadata.ts, so no explicit import is needed here.
// Next.js will automatically pick it up from app/metadata.ts if it's present.

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['400', '700'],
});

// REMOVED: export const metadata = { ... };
// It will now be picked up from app/metadata.ts

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} font-sans`}>
        <AuthProvider>
          <SettingsProvider>
            <AudioProvider>
              {/* Клиентский компонент с Header внутри */}
              <ClientLayoutContent>{children}</ClientLayoutContent>
            </AudioProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}