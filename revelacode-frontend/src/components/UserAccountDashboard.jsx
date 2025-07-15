import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function UserAccountDashboard({ onOpenSettings, onOpenAccounts, onOpenReferential }) {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        👤 Welcome, {user?.username}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={onOpenSettings}
          className="bg-green-600 dark:bg-green-500 text-white py-2 rounded shadow hover:scale-105 transform transition"
        >
          ⚙ Settings
        </button>
        <button
          onClick={onOpenAccounts}
          className="bg-pink-600 dark:bg-pink-500 text-white py-2 rounded shadow hover:scale-105 transform transition"
        >
          🔗 Linked Accounts
        </button>
        <button
          onClick={onOpenReferential}
          className="bg-yellow-600 dark:bg-yellow-500 text-white py-2 rounded shadow hover:scale-105 transform transition"
        >
          📚 Referential
        </button>
      </div>
      <button
        onClick={logout}
        className="text-red-500 underline text-sm hover:text-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
