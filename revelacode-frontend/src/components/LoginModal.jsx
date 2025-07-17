import React, { useState } from 'react';

export default function LoginModal({ onClose, onLogin }) {
  const [mode, setMode] = useState('register'); // 'register' | 'login' | 'guest'
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!contact || !password) {
      return setError('❗ Contact and password are required.');
    }

    if (mode === 'register') {
      if (!fullName || !confirmPassword) {
        return setError('❗ All fields are required.');
      }
      if (password !== confirmPassword) {
        return setError('❌ Passwords do not match.');
      }
    }

    const endpoint = `${baseUrl}/${mode}`;
    const payload = mode === 'register'
      ? { full_name: fullName, contact, password }
      : { contact, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(
          mode === 'guest'
            ? '✅ Guest login — you may decode up to 5 prophecy symbols.'
            : '✅ Welcome to REVELACODE!'
        );
        onLogin?.({ user: data.user || null, guest: mode === 'guest' });
      } else {
        setError(data?.message || '❌ Login/Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Could not connect to backend.');
    }
  };

  const handleGuestLogin = () => {
    // Simulate guest login
    setSuccessMessage('✅ You are now logged in as Guest (5 symbol decode limit).');
    onLogin?.({ guest: true });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {!successMessage ? (
          <>
            <h2 className="text-lg font-bold text-center mb-4">
              {mode === 'register'
                ? '📝 Create an Account'
                : mode === 'login'
                ? '🔐 Login to Your Account'
                : '👤 Guest Login'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'register' && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:text-white"
                />
              )}

              <input
                type="text"
                placeholder="Email or Phone"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:text-white"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:text-white"
              />

              {mode === 'register' && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:text-white"
                />
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {mode === 'register' ? 'Register' : mode === 'login' ? 'Login' : 'Continue as Guest'}
              </button>
            </form>

            <div className="text-center mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {mode !== 'login' && (
                <button
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:underline"
                >
                  🔐 Already have an account? Login
                </button>
              )}
              {mode !== 'register' && (
                <button
                  onClick={() => setMode('register')}
                  className="text-blue-600 hover:underline"
                >
                  📝 New user? Register
                </button>
              )}
              {mode !== 'guest' && (
                <button
                  onClick={() => handleGuestLogin()}
                  className="text-blue-600 hover:underline block"
                >
                  👤 Continue as Guest
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-bold">{successMessage}</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
