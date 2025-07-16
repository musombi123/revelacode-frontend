import React, { useState } from 'react';

export default function LoginModal({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !contact || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          contact,
          password
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage('✅ Welcome to REVELACODE — Where Prophecy Meets Tech In Our Generation!');
      } else {
        setError(data?.message || '❌ Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Could not connect.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold">📝 Create a new account</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 rounded border"
            />

            <input
              type="text"
              placeholder="Email or Phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 rounded border"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded border"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded border"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Register
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 underline"
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-green-600 font-bold">{successMessage}</h2>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
