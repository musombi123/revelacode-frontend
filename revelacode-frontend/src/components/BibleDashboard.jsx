import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

export default function BibleDashboard() {
  const [bibleData, setBibleData] = useState({});
  const [bookKeys, setBookKeys] = useState([]);
  const [selectedBookKey, setSelectedBookKey] = useState('');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);
  const [verses, setVerses] = useState([]);
  const [viewLevel, setViewLevel] = useState('books'); // books | chapters | verses
  const [searchInput, setSearchInput] = useState('');
  const [highlightedVerseIndex, setHighlightedVerseIndex] = useState(null);

  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        const response = await fetch('/data/kjv.json');
        const data = await response.json();
        setBibleData(data);
        const keys = Object.keys(data);
        setBookKeys(keys);
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
    setViewLevel('chapters');
    setHighlightedVerseIndex(null);
  };

  const handleChapterClick = (chapterIndex) => {
    setSelectedChapterIndex(chapterIndex);
    const chapter = bibleData[selectedBookKey].chapters[chapterIndex];
    setVerses(chapter.verses);
    setViewLevel('verses');
    setHighlightedVerseIndex(null);
  };

  const handleBack = () => {
    if (viewLevel === 'verses') {
      setViewLevel('chapters');
      setHighlightedVerseIndex(null);
    } else if (viewLevel === 'chapters') {
      setViewLevel('books');
      setSelectedBookKey('');
    }
  };

  const handleSearch = () => {
    const match = searchInput.match(/^([\dI]{0,2}\s?\w+)\s+(\d+):(\d+)$/i);
    if (!match) return;

    const [, bookNameRaw, chapterNum, verseNum] = match;
    const bookName = bookNameRaw.trim();
    const bookKey = bookKeys.find(
      (key) => bibleData[key]?.book.toLowerCase() === bookName.toLowerCase()
    );

    if (bookKey) {
      const chapterIndex = parseInt(chapterNum, 10) - 1;
      const verseIndex = parseInt(verseNum, 10) - 1;

      setSelectedBookKey(bookKey);
      setSelectedChapterIndex(chapterIndex);
      setHighlightedVerseIndex(verseIndex);

      const selected = bibleData[bookKey];
      const versesArray = selected.chapters[chapterIndex]?.verses ?? [];
      setVerses(versesArray);
      setViewLevel('verses');

      setTimeout(() => {
        const el = document.getElementById(`verse-${verseIndex}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const selectedBook = bibleData[selectedBookKey];

  return (
    <div className="p-4 space-y-4">
      {/* Search bar always at the top */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search e.g. John 3:16"
          className="w-full p-2 rounded border bg-background text-foreground"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Back button */}
      {viewLevel !== 'books' && (
        <button onClick={handleBack} className="text-blue-500 underline text-sm">
          ← Back
        </button>
      )}

      {/* Books view */}
      {viewLevel === 'books' && (
        <ScrollArea className="h-[70vh] pr-2 space-y-4">
          <h2 className="font-bold mb-2">📖 Bible Books</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {bookKeys.map((key) => (
              <li
                key={key}
                onClick={() => handleBookClick(key)}
                className={`cursor-pointer p-2 rounded border text-center hover:bg-blue-100 dark:hover:bg-blue-800 ${
                  selectedBookKey === key ? 'bg-blue-200 dark:bg-blue-700 font-semibold' : ''
                }`}
              >
                {bibleData[key]?.book}
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}

      {/* Chapters view */}
      {viewLevel === 'chapters' && selectedBook && (
        <div>
          <h3 className="text-lg font-bold mb-2">📘 {selectedBook.book} — Chapters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedBook.chapters.map((chapter, idx) => (
              <button
                key={idx}
                onClick={() => handleChapterClick(idx)}
                className={`px-3 py-1 rounded border ${
                  selectedChapterIndex === idx ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {chapter.chapter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Verses view */}
      {viewLevel === 'verses' && selectedBook && selectedChapterIndex !== null && (
        <Card>
          <CardContent className="max-h-[60vh] overflow-y-auto space-y-2">
            <h4 className="text-md font-semibold mb-2">
              {selectedBook.book} {selectedBook.chapters[selectedChapterIndex].chapter}
            </h4>
            {verses.map((v, idx) => (
              <div
                key={idx}
                id={`verse-${idx}`}
                className={`text-sm leading-relaxed p-1 rounded ${
                  highlightedVerseIndex === idx ? 'bg-yellow-200 dark:bg-yellow-600' : ''
                }`}
              >
                <strong>{v.verse}</strong>. {v.text}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
