import React, { useEffect, useState } from 'react';

export default function ProphecyEventsDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetch(`https://revelacode-backend.onrender.com/events_decoded/events_${today}.json`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to load events', err));
  }, []);

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
            <a href={e.url} target="_blank" rel="noopener noreferrer"
               className="text-blue-600 dark:text-blue-400 hover:underline">
              {e.headline}
            </a>
            <p className="text-xs text-gray-600 dark:text-gray-400">{e.description}</p>
            <span className="text-xs text-gray-400">🗓 {new Date(e.publishedAt).toLocaleString()} — {e.source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
