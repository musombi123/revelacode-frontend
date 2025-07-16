import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginModal({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('register'); // or 'login'
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState(''); // phone or email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!fullName || !contact || !password || !confirmPassword) {
      setMessage('⚠️ Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }
    try {
      await register({ fullName, contact, password });
      setMessage('✅ Welcome to REVELACODE — where prophecy meets tech in our generation.');
      setTimeout(onClose, 2000); // auto-close after welcome
    } catch (err) {
      setMessage('❌ Registration failed.');
    }
  };

  const handleLogin = async () => {
    if (!contact || !password) {
      setMessage('⚠️ Enter your contact and password.');
      return;
    }
    try {
      await login({ contact, password });
      setMessage('✅ Welcome back!');
      setTimeout(onClose, 1000);
    } catch (err) {
      setMessage('❌ Invalid login.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          {mode === 'register' ? '📝 Create a new account' : '🔑 Login'}
        </h2>

        {mode === 'register' && (
          <input
            type="text"
            placeholder="Full name"
            className="w-full mb-2 p-2 rounded border dark:bg-gray-700 dark:text-white"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}

        <input
          type="text"
          placeholder="Phone number or Email"
          className="w-full mb-2 p-2 rounded border dark:bg-gray-700 dark:text-white"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 rounded border dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === 'register' && (
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full mb-2 p-2 rounded border dark:bg-gray-700 dark:text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button
          onClick={mode === 'register' ? handleRegister : handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
        >
          {mode === 'register' ? 'Register' : 'Login'}
        </button>

        <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
          {mode === 'register' ? (
            <>Already have an account?{' '}
              <span onClick={() => { setMode('login'); setMessage(''); }} className="text-blue-600 cursor-pointer">Login</span>
            </>
          ) : (
            <>New user?{' '}
              <span onClick={() => { setMode('register'); setMessage(''); }} className="text-blue-600 cursor-pointer">Create account</span>
            </>
          )}
        </p>

        {message && (
          <p className="text-xs text-center mt-2 text-red-500 dark:text-red-400">{message}</p>
        )}
      </div>
    </div>
  );
}
