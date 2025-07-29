'use client';
import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Thank you for your purchase!</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg text-center max-w-md">
        You now have access to all Pro features. Enjoy your productivity boost!
      </p>
    </div>
  );
};

export default SuccessPage;
