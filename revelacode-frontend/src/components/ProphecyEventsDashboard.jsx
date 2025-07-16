import React, { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_API_URL;

export default function ProphecyEventsDashboard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const url = `${baseUrl}/events_decoded/events_${today}.json`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setEvents(data))
      .catch(err => {
        console.error('❌ Failed to load events:', err);
        setError('Could not load events from backend.');
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
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        📡 No prophecy-related global events found today.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg text-indigo-600 dark:text-indigo-300">
        🌍 Latest Global Events (Prophecy Tracking)
      </h3>
      <ul className="space-y-1">
        {events.map((e, idx) => (
          <li key={idx} className="border-b pb-2">
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {e.headline}
            </a>
            <p className="text-xs text-gray-600 dark:text-gray-400">{e.description}</p>
            <span className="text-xs text-gray-400">
              🗓 {new Date(e.publishedAt).toLocaleString()} — {e.source}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
