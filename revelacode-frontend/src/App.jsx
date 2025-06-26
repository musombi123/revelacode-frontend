import React from 'react';
import ProphecyDashboard from './components/ProphecyDashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        🔍 RevelaCode Prophecy Decoder
      </h1>
      <ProphecyDashboard />
    </div>
  );
}

