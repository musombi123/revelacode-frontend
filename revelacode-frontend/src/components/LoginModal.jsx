import React, { useState } from 'react';

export default function LoginModal({ onLoginSuccess, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    // Perform authentication with backend (e.g., API call)
    if (username === 'test' && password === 'password') {
      onLoginSuccess(username);
      onClose();
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">Login</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mt-4 space-y-3">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
