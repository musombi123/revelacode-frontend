import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState('login'); // login | register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const backendUrl = import.meta.env.VITE_API_URL; // e.g. https://revelacode-backend.onrender.com

  const handleSubmit = async () => {
    if (!username || !password) return;

    try {
      const res = await fetch(`${backendUrl}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${mode === 'login' ? 'Logged in' : 'Account created'} successfully!`);
        window.location.reload(); // or better: call setUser in AuthContext
      } else {
        setMessage(`❌ ${data.message || 'Something went wrong'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Network error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-center">
          {mode === 'login' ? '🔑 Login to your account' : '📝 Create a new account'}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 rounded border bg-background text-foreground"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 rounded border bg-background text-foreground"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        <p className="text-center text-sm text-gray-500">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button onClick={() => setMode('register')} className="text-blue-600 hover:underline">Register</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-blue-600 hover:underline">Login</button>
            </>
          )}
        </p>
        {message && <p className="text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
