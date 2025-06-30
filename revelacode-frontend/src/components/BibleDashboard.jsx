import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

export default function BibleDashboard() {
  const [bibleData, setBibleData] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        const response = await fetch('/data/kjv.json');
        const data = await response.json();
        setBibleData(data);

        // Extract unique books
        const bookNames = [...new Set(data.map(v => v.book))];
        setBooks(bookNames);
        setSelectedBook(bookNames[0]); // default to first book
      } catch (error) {
        console.error('Failed to load Bible data:', error);
      }
    };

    fetchBibleData();
  }, []);

  // When book changes, update chapters
  useEffect(() => {
    if (!selectedBook) return;

    const bookChapters = bibleData
      .filter(v => v.book === selectedBook)
      .map(v => v.chapter);

    const uniqueChapters = [...new Set(bookChapters)].sort((a, b) => a - b);
    setChapters(uniqueChapters);
    setSelectedChapter(uniqueChapters[0]); // default to first chapter
  }, [selectedBook, bibleData]);

  // When chapter changes, update verses
  useEffect(() => {
    if (!selectedBook || !selectedChapter) return;

    const chapterVerses = bibleData.filter(
      v => v.book === selectedBook && v.chapter === Number(selectedChapter)
    );
    setVerses(chapterVerses);
  }, [selectedBook, selectedChapter, bibleData]);

  return (
    <div className="space-y-4 p-4">
      {/* Book selection */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Book</label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full p-2 rounded border"
          >
            {books.map((book) => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
        </div>

        {/* Chapter selection */}
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Chapter</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full p-2 rounded border"
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>Chapter {ch}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display verses */}
      <Card>
        <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
          {verses.length > 0 ? (
            verses.map((verse, idx) => (
              <div key={idx} className="text-sm">
                <strong>{verse.verse}</strong>. {verse.text}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No verses found for this chapter.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
