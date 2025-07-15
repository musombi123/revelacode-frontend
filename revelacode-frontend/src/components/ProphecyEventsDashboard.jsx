import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export default function GlobalNewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('https://revelacode-backend.onrender.com/api/news') // change to your backend URL
      .then(res => res.json())
      .then(data => setNews(data.news))
      .catch(err => console.error('Failed to load news', err));
  }, []);

  if (news.length === 0) return <p className="text-gray-500">No decoded news found.</p>;

  return (
    <div className="space-y-4">
      {news.map((item, idx) => (
        <Card key={idx} className="shadow rounded-xl">
          <CardContent className="p-4">
            <h3 className="font-semibold text-indigo-600">{item.title || 'Decoded Headline'}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
              {item.meaning || JSON.stringify(item)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
