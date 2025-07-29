'use client';

import React from 'react';

const PADDLE_CHECKOUT_URL = 'https://pay.paddle.com/checkout/123456'; // 🔁 ЗАМЕНИ на свою ссылку

const ProPage = () => {

  const handlePurchaseClick = () => {
    window.location.href = `${PADDLE_CHECKOUT_URL}?return_url=https://timing-five.vercel.app/success`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Upgrade to <span className="text-blue-600">Timing Pro</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Unlock full access to all timers, sounds, focus modes, and future features.
          One-time purchase. Lifetime access.
        </p>

        <ul className="text-left mb-6 text-gray-700 dark:text-gray-200 space-y-2">
          <li>✅ Unlimited Pomodoro sessions</li>
          <li>✅ Breathing & focus timers</li>
          <li>✅ Sound packs & alarms</li>
          <li>✅ Dark mode & custom themes</li>
          <li>✅ Lifetime updates & support</li>
        </ul>

        <div className="mb-4 text-2xl font-semibold text-green-600">$9.99 one-time</div>

        <button
          onClick={handlePurchaseClick}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition"
        >
          Get Pro Access
        </button>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Secure payment via Paddle. VAT may apply depending on your location.
        </p>
      </div>
    </div>
  );
};

export default ProPage;
