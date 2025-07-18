import React, { useEffect, useState } from 'react';

// 🔗 Connect to backend via VITE_API_URL
const baseUrl = import.meta.env.VITE_API_URL;

export default function ProphecyEventsDashboard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/events`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then(data => setEvents(data))
      .catch(err => {
        console.error("❌ Failed to load events:", err);
        setError("Could not load events from backend.");
      });
  }, []);

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400 text-sm">
        ⚠️ {error}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-sm italic">
        📡 No prophecy-related global events found today.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
      <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
        🌍 Latest Global Events <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Prophecy Tracking)</span>
      </h3>

      <ul className="space-y-4">
        {events.map((e, idx) => (
          <li key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {e.headline}
            </a>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {e.description}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              🗓 {new Date(e.publishedAt).toLocaleString()} • {e.source}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
