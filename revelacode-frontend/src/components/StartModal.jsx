// src/components/StartModal.jsx
import React from 'react';
import { Button } from '@/components/ui/Button';
import { BookOpen, LogIn, Eye } from 'lucide-react';

export default function StartModal({ onLogin, onGuest }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex flex-col justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center space-y-4 w-80">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🔮 Welcome to RevelaCode</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Explore prophecy decoding, Bible study & events.
        </p>

        <div className="space-y-2">
          <Button onClick={onLogin} className="w-full flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5" /> Login / Create Account
          </Button>
          <Button
            variant="secondary"
            onClick={onGuest}
            className="w-full flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" /> Continue as Guest
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Guest mode: only Bible & events will be available.
        </p>
      </div>
    </div>
  );
}
