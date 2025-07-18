import React, { useState } from 'react';

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState('register'); // register | login | guest
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement fetch logic here for register/login
    console.log({ mode, contact, password, fullName });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">
          {mode === 'register' && '📝 Create a new account'}
          {mode === 'login' && '🔐 Login to your account'}
          {mode === 'guest' && '👀 Continue as Guest'}
        </h2>

        {mode === 'guest' ? (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              You can view prophecies and events but only decode up to 5 symbols.
            </p>
            <button
              onClick={() => {
                // Save guest state to auth context if you use one
                localStorage.setItem('guest', 'true');
                onClose();
              }}
              className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            >
              Continue as Guest
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            )}
            <input
              type="text"
              placeholder="Email or Phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {mode === 'register' ? 'Register' : 'Login'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        )}

        {/* Switch Mode */}
        <div className="mt-4 text-sm text-center space-x-2">
          {mode !== 'login' && (
            <button onClick={() => setMode('login')} className="text-blue-600 underline">
              Login
            </button>
          )}
          {mode !== 'register' && (
            <button onClick={() => setMode('register')} className="text-blue-600 underline">
              Register
            </button>
          )}
          {mode !== 'guest' && (
            <button onClick={() => setMode('guest')} className="text-blue-600 underline">
              Guest
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
