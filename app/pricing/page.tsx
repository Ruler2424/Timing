'use client';

import React from 'react';

const PADDLE_CHECKOUT_URL = 'https://pay.paddle.com/checkout/123456'; // Замените на свою ссылку

const ProPage: React.FC = () => {
  const handlePurchaseClick = () => {
    if (typeof window !== 'undefined') {
      const returnUrl = encodeURIComponent('https://timing-five.vercel.app/success');
      window.location.href = `${PADDLE_CHECKOUT_URL}?return_url=${returnUrl}`;
    }
  };

  const features = [
    ['Basic timers and alarms', true, true],
    ['Custom sound uploads', false, true],
    ['Theme customization', false, true],
    ['Schedule export', false, true],
    ['Priority support', false, true],
    ['Early access to new features', false, true],
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-[var(--bg-color)] text-[var(--text-color)]">
      <h1 className="text-4xl font-bold text-center mb-6">
        Unlock Full Power with <span className="text-[var(--link-hover-color)]">PRO</span>
      </h1>
      <p className="text-center text-lg mb-10 text-[var(--text-muted-color)]">
        Upgrade to PRO for premium features, custom sounds, themes, and more tools to boost your productivity.
      </p>

      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-[var(--card-bg-color)] shadow-md rounded-lg overflow-hidden text-[var(--text-color)]">
          <thead>
            <tr className="bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] text-left text-sm uppercase">
              <th className="py-3 px-5">Feature</th>
              <th className="py-3 px-5 text-center">Free</th>
              <th className="py-3 px-5 text-center">PRO</th>
            </tr>
          </thead>
          <tbody>
            {features.map(([feature, free, pro], idx) => (
              <tr key={idx} className="border-t border-[var(--border-color)]">
                <td className="py-4 px-5 font-medium">{feature}</td>
                <td className="py-4 px-5 text-center">{free ? '✅' : '—'}</td>
                <td className="py-4 px-5 text-center">{pro ? '✅' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Monthly Plan */}
        <div className="border border-[var(--border-color)] rounded-2xl p-6 shadow hover:shadow-lg transition bg-[var(--card-bg-color)] text-[var(--text-color)]">
          <h3 className="text-xl font-bold mb-2">PRO — Monthly</h3>
          <p className="mb-4 text-[var(--text-muted-color)]">Access all PRO features for 30 days.</p>
          <div className="text-2xl font-semibold mb-4">$2.99 / month</div>
          <button
            onClick={handlePurchaseClick}
            className="rounded px-4 py-2 w-full bg-[var(--button-primary-bg)] text-[var(--button-text-light)] hover:bg-[var(--button-primary-hover-bg)] transition"
          >
            Buy for $2.99
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="border-2 border-[var(--button-primary-bg)] rounded-2xl p-6 shadow-lg bg-[var(--card-bg-color)] hover:shadow-xl transition relative">
          <div className="absolute top-0 right-0 bg-[var(--button-primary-bg)] text-[var(--button-text-light)] text-xs font-semibold px-2 py-1 rounded-bl">
            Best Value
          </div>
          <h3 className="text-xl font-bold mb-2">PRO — Yearly</h3>
          <p className="mb-4 text-[var(--text-muted-color)]">Save 45% compared to monthly billing.</p>
          <div className="text-2xl font-semibold mb-4">$19.99 / year</div>
          <button
            onClick={handlePurchaseClick}
            className="rounded px-4 py-2 w-full bg-[var(--button-primary-bg)] text-[var(--button-text-light)] hover:bg-[var(--button-primary-hover-bg)] transition"
          >
            Buy for $19.99
          </button>
        </div>

        {/* Lifetime Plan */}
        <div className="border-2 border-[var(--pro-icon-color)] rounded-2xl p-6 shadow-lg bg-[var(--card-bg-color)] hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2 text-[var(--pro-icon-color)]">💎 PRO — Lifetime</h3>
          <p className="mb-4 text-[var(--text-muted-color)]">
            One-time payment. Unlimited access forever.
          </p>
          <div className="text-2xl font-bold mb-4 text-[var(--pro-icon-color)]">$39.99</div>
          <button
            onClick={handlePurchaseClick}
            className="rounded px-4 py-2 w-full bg-[var(--pro-icon-color)] text-[var(--button-text-light)] hover:bg-yellow-600 transition"
          >
            Buy Lifetime Access
          </button>
        </div>
      </div>

      <div className="mt-16 text-center text-[var(--text-color)]">
        <h2 className="text-2xl font-bold mb-2">Upgrade to PRO and feel the difference!</h2>
        <p className="mb-4 text-[var(--text-muted-color)]">
          Unlock premium tools and get the most out of your time management.
        </p>
      </div>
    </div>
  );
};

export default ProPage;
