import React, { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_API_URL;

const CATEGORY_LABELS = {
  wars_conflicts: "Wars & Conflicts",
  natural_disasters: "Natural Disasters",
  economic: "Economic Signs",
  crime: "Crime & Lawlessness",
  politics: "Political Upheaval",
  health: "Health Crises",
  social_morality: "Moral Decay",
  false_peace: "False Peace",
  one_world_government: "One World Government",
  digital_currency: "Digital Currency",
  apostasy: "Apostasy",
  surveillance: "Surveillance",
};

const ITEMS_PER_PAGE = 10;

export default function ProphecyEventsDashboard() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [page, setPage] = useState(1);

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
    const filteredList = events.filter(e =>
      e.matched_symbols?.includes(category)
    );
    setFiltered(filteredList);
    setPage(1);
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setFiltered(events);
    setPage(1);
  };

  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (error) return <div className="text-red-500 text-sm">{error}</div>;

  if (!events.length) {
    return <div className="text-gray-500 text-sm">📡 No prophecy-related global events found recently.</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">🌍 Prophecy Events</h3>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        {Object.keys(CATEGORY_LABELS).map(key => (
          <button
            key={key}
            onClick={() => handleFilter(key)}
            className={`px-2 py-1 rounded border ${
              activeFilter === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            {CATEGORY_LABELS[key]}
          </button>
        ))}
        {activeFilter && (
          <button onClick={clearFilter} className="text-red-600 text-xs underline">Clear</button>
        )}
      </div>

      {/* Events */}
      <ul className="space-y-3">
        {paged.map((e, idx) => (
          <li key={idx} className="border-b pb-2">
            <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
              {e.headline}
            </a>
            <p className="text-sm text-gray-600">{e.description}</p>
            <div className="flex flex-wrap gap-1 text-xs text-gray-500 mt-1">
              <span>🗓 {new Date(e.publishedAt).toLocaleString()}</span>
              <span>— {e.source}</span>
              {e.matched_symbols?.map(cat => (
                <span key={cat} className="ml-2 px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">{CATEGORY_LABELS[cat] || cat}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {filtered.length > ITEMS_PER_PAGE && (
        <div className="flex gap-3 text-sm justify-center mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>⬅ Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page * ITEMS_PER_PAGE >= filtered.length}>Next ➡</button>
        </div>
      )}
    </div>
  );
}
