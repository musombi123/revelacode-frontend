import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function BibleDashboard() {
  const [bibleData, setBibleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVerses, setFilteredVerses] = useState([]);

  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/kjv.json`);
        const data = await response.json();
        setBibleData(data);
      } catch (error) {
        console.error('Failed to load Bible data:', error);
      }
    };

    fetchBibleData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredVerses([]);
      return;
    }

    const filtered = bibleData.filter((verse) =>
      verse.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVerses(filtered);
  }, [searchTerm, bibleData]);

  return (
    <div className="space-y-4 p-4">
      <Input
        placeholder="🔍 Search scripture (e.g. 'faith', 'John 3:16')"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      <Card>
        <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
          {searchTerm.trim() ? (
            filteredVerses.length > 0 ? (
              filteredVerses.map((verse, idx) => (
                <div key={idx} className="border-b pb-2 text-sm">
                  <strong>{verse.book} {verse.chapter}:{verse.verse}</strong><br />
                  {verse.text}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">⚠️ No verses found matching your query.</p>
            )
          ) : (
            <p className="text-muted-foreground">📖 Start typing to explore the King James Bible.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
