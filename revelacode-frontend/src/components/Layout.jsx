import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      {/* You could add a header or sidebar here */}
      {children}
      {/* And maybe a footer here */}
    </div>
  );
}
