import React, { useEffect, useState } from "react";

interface Prophecy {
  id: string;
  verse: string;
  meaning: string;
}

const ProphecyDashboard: React.FC = () => {
  const [prophecies, setProphecies] = useState<Prophecy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProphecies = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/prophecies`);
        if (!res.ok) throw new Error("Failed to fetch prophecies");
        const data = await res.json();
        setProphecies(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProphecies();
  }, []);

  if (loading) return <div>⏳ Loading prophecies...</div>;
  if (error) return <div>❌ Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📜 Prophecy Dashboard</h2>
      {prophecies.length === 0 ? (
        <p>No prophecies found.</p>
      ) : (
        <ul className="space-y-4">
          {prophecies.map((prophecy) => (
            <li key={prophecy.id} className="bg-white p-4 rounded shadow">
              <p className="text-lg font-semibold">📖 {prophecy.verse}</p>
              <p className="text-gray-700 mt-2">💡 {prophecy.meaning}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProphecyDashboard;
