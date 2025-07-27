// components/CallToActionSection.tsx
'use client'; // <-- ЭТОТ КОМПОНЕНТ ДОЛЖЕН БЫТЬ КЛИЕНТСКИМ

import React from 'react';
import Link from 'next/link'; // Используем Link из next/link

const CallToActionSection: React.FC = () => {
  return (
    <section className="bg-blue-600 text-white py-16 text-center rounded-lg shadow-xl mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to manage your time effectively?</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Start using TimeCraft now and unlock a world of organized productivity.
      </p>
      <Link href="/dashboard" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-xl hover:bg-blue-100 transition-colors duration-300 shadow-lg">
        Go to Timers
      </Link>
    </section>
  );
};

export default CallToActionSection;