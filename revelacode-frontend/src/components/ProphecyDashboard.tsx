// src/components/ProphecyDashboard.jsx
import React, { useEffect, useState } from 'react';

const ProphecyDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://revelacode-backend.onrender.com/api/prophecies')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading prophecy...</p>;

  return (
    <div>
      <h1>Prophecy Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProphecyDashboard;
