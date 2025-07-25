import React, { useState } from 'react';

export default function LoginModal({ onClose, onGuest }) {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!contact || !password || (!isLogin && (!fullName || !confirmPassword))) {
      setError('⚠ All fields are required.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }

    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin
      ? { username: contact, password }
      : { username: contact, password };

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${isLogin ? 'Login' : 'Registration'} successful!`);
        setTimeout(onClose, 1500); // Auto close
      } else {
        setError(data.message || '❌ Failed to login/register.');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Server error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isLogin ? '🔐 Login to RevelaCode' : '📝 Register to RevelaCode'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
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

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="text-center text-sm mt-2">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="text-blue-600 underline">Register</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-blue-600 underline">Login</button>
              </>
            )}
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onGuest}
              className="text-gray-700 dark:text-gray-300 text-sm underline"
            >
              👀 Continue as Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
