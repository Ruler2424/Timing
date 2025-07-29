'use client'

import React from 'react'

const RefundPolicy: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-base leading-relaxed" style={{ color: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
        Refund Policy
      </h1>

      <p className="mb-4">
        We want you to be completely satisfied with your purchase. That’s why we follow a 14-day refund policy in accordance with{' '}
        <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
          Paddle’s Buyer Terms
        </a>.
      </p>

      <p className="mb-4">
        If for any reason you are not satisfied with your purchase, you may request a refund within <strong>14 days</strong> of the transaction date.
      </p>

      <p className="mb-4">
        To request a refund, please email us at{' '}
        <a href="mailto:alisher.9000@gmail.com" className="underline text-blue-600 hover:text-blue-800">
          alisher.9000@gmail.com
        </a>{' '}
        and include the following:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>Your order number</li>
        <li>Email address used during checkout</li>
        <li>Reason for the refund request</li>
      </ul>

      <p className="mb-4">
        After the 14-day period, refund requests may not be accepted unless the product is faulty, not delivered, or there are other exceptional circumstances.
      </p>

      <p className="text-sm text-gray-500 mt-6">
        Please note: Refunds are processed through Paddle, our payment partner.
      </p>
    </main>
  )
}

export default RefundPolicy
