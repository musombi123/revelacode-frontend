import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function LoginModal({ onClose }) {
  const { login, register, guestMode } = useAuth();

  const [mode, setMode] = useState('register');    // start directly with register
  const [fullname, setFullname] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!contact || !password) return setError('All fields are required');
        const res = await login(contact, password);
        if (!res.success) return setError(res.message || 'Something went wrong');
        onClose();
      } else {
        if (!fullname || !contact || !password || !confirmPassword)
          return setError('All fields are required');
        if (password !== confirmPassword)
          return setError('Passwords do not match');
        const res = await register({ fullname, contact, password });
        if (!res.success) return setError(res.message || 'Something went wrong');
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold text-center text-indigo-600 dark:text-indigo-300">
          {mode === 'login' ? 'Login to RevelaCode' : 'Create your RevelaCode Account'}
        </h2>

        {mode === 'register' && (
          <input
            type="text"
            placeholder="Full name"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            className="w-full p-2 rounded border bg-background text-foreground"
          />
        )}

        <input
          type="text"
          placeholder="Email or Phone"
          value={contact}
          onChange={e => setContact(e.target.value)}
          className="w-full p-2 rounded border bg-background text-foreground"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 rounded border bg-background text-foreground"
        />

        {mode === 'register' && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded border bg-background text-foreground"
          />
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
        </button>

        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <button onClick={guestMode} className="underline">
            Continue as guest
          </button>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="underline"
          >
            {mode === 'login' ? 'Create an account' : 'Have an account? Login'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          Welcome to RevelaCode: Where prophecy meets tech in our generation.
        </p>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
