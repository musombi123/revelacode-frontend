import React, { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_API_URL;

const CATEGORY_MAP = {
  wars_conflicts: ["war", "conflict", "strike", "bomb", "attack"],
  natural_disasters: ["earthquake", "flood", "wildfire", "eruption"],
  economic: ["inflation", "recession", "crash", "unemployment"],
  crime: ["shooting", "murder", "serial killer", "rape"],
  politics: ["coup", "impeachment", "corruption"],
  health: ["outbreak", "virus", "pandemic", "epidemic"],
  social_morality: ["LGBT", "scandal", "hypocrisy", "child abuse"]
};

export default function ProphecyEventsDashboard() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/events`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setEvents(data);
        setFiltered(data);
      })
      .catch(err => {
        console.error("❌ Failed to load events:", err);
        setError("⚠️ Could not load events from backend.");
      });
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    const keywords = CATEGORY_MAP[category] || [];
    const filteredList = events.filter(e =>
      keywords.some(k =>
        e.headline?.toLowerCase().includes(k) ||
        e.description?.toLowerCase().includes(k)
      )
    );
    setFiltered(filteredList);
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setFiltered(events);
  };

  if (error) return <div className="text-red-500 text-sm">{error}</div>;

  if (!events.length) {
    return <div className="text-gray-500 text-sm">📡 No prophecy-related global events found today.</div>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">🌍 Prophecy Events</h3>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        {Object.keys(CATEGORY_MAP).map(key => (
          <button
            key={key}
            onClick={() => handleFilter(key)}
            className={`px-2 py-1 rounded border ${activeFilter === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            {key.replace('_', ' ')}
          </button>
        ))}
        {activeFilter && (
          <button onClick={clearFilter} className="text-red-600 text-xs underline">Clear</button>
        )}
      </div>

      {/* Events */}
      <ul className="space-y-2">
        {filtered.map((e, idx) => (
          <li key={idx} className="border-b pb-2">
            <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {e.headline}
            </a>
            <p className="text-xs text-gray-500">{e.description}</p>
            <span className="text-xs text-gray-400">🗓 {new Date(e.publishedAt).toLocaleString()} — {e.source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
