import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

export default function BibleDashboard() {
  const [bibleData, setBibleData] = useState({});
  const [bookKeys, setBookKeys] = useState([]);
  const [selectedBookKey, setSelectedBookKey] = useState('');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        const response = await fetch('/data/kjv.json');
        const data = await response.json();
        setBibleData(data);
        const keys = Object.keys(data);
        setBookKeys(keys);
        setSelectedBookKey(keys[0]); // auto-select first book
      } catch (error) {
        console.error('Failed to load Bible data:', error);
      }
    };

    fetchBibleData();
  }, []);

  const handleBookClick = (key) => {
    setSelectedBookKey(key);
    setSelectedChapterIndex(null);
    setVerses([]);
  };

  const handleChapterClick = (chapterIndex) => {
    setSelectedChapterIndex(chapterIndex);
    const selected = bibleData[selectedBookKey];
    const chapter = selected.chapters[chapterIndex];
    setVerses(chapter.verses);
  };

  const selectedBook = bibleData[selectedBookKey];

  return (
    <div className="flex gap-6 p-4">
      {/* Book List */}
      <div className="w-1/4 max-h-[80vh] border-r pr-4">
        <h2 className="font-bold mb-2">📚 Books</h2>
        <ScrollArea className="h-[70vh] pr-2">
          <ul className="space-y-1">
            {bookKeys.map((key) => (
              <li
                key={key}
                onClick={() => handleBookClick(key)}
                className={`cursor-pointer p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800 ${
                  selectedBookKey === key ? 'bg-blue-200 dark:bg-blue-700 font-semibold' : ''
                }`}
              >
                {bibleData[key]?.book || key}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Chapter + Verse Panel */}
      <div className="flex-1 space-y-4">
        {/* Chapters */}
        {selectedBook && (
          <div>
            <h3 className="text-lg font-bold mb-2">📖 {selectedBook.book} — Chapters</h3>
            <div className="flex flex-wrap gap-2">
              {selectedBook.chapters.map((chapter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChapterClick(idx)}
                  className={`px-3 py-1 rounded border ${
                    selectedChapterIndex === idx ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {chapter.chapter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Verses */}
        {selectedChapterIndex !== null && (
          <Card>
            <CardContent className="max-h-[50vh] overflow-y-auto space-y-2">
              <h4 className="text-md font-semibold mb-2">
                {selectedBook.book} {selectedBook.chapters[selectedChapterIndex].chapter}
              </h4>
              {verses.map((v, idx) => (
                <div key={idx} className="text-sm">
                  <strong>{v.verse}</strong>. {v.text}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
