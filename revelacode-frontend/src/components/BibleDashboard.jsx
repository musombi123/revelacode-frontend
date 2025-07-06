import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

const oldTestament = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
  'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
];

const newTestament = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
  '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];


export default function BibleDashboard() {
  const [bibleData, setBibleData] = useState({});
  const [bookKeys, setBookKeys] = useState([]);
  const [selectedBookKey, setSelectedBookKey] = useState('');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);
  const [verses, setVerses] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        const response = await fetch('/data/kjv.json');
        const data = await response.json();
        setBibleData(data);
        const keys = Object.keys(data);
        setBookKeys(keys);
        setSelectedBookKey(keys[0]); // Default to first
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

  const handleSearch = () => {
    const match = searchInput.match(/^([\dI]{0,2}\s?\w+)\s+(\d+):(\d+)$/i);
    if (!match) return;

    const [, bookNameRaw, chapterNum, verseNum] = match;
    const bookName = bookNameRaw.trim();
    const bookKey = bookKeys.find((key) => bibleData[key]?.book.toLowerCase() === bookName.toLowerCase());

    if (bookKey) {
      const chapterIndex = parseInt(chapterNum, 10) - 1;
      const verseIndex = parseInt(verseNum, 10) - 1;

      setSelectedBookKey(bookKey);
      setSelectedChapterIndex(chapterIndex);

      const selected = bibleData[bookKey];
      const versesArray = selected.chapters[chapterIndex]?.verses ?? [];
      setVerses(versesArray);
      setTimeout(() => {
        const el = document.getElementById(`verse-${verseIndex}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleBack = () => {
    if (selectedChapterIndex !== null) {
      setSelectedChapterIndex(null);
      setVerses([]);
    } else {
      setSelectedBookKey('');
    }
  };

  const selectedBook = bibleData[selectedBookKey];

  const oldBooks = bookKeys
    .filter((key) => oldTestament.includes(bibleData[key]?.book))
    .sort((a, b) => oldTestament.indexOf(bibleData[a].book) - oldTestament.indexOf(bibleData[b].book));

  const newBooks = bookKeys
    .filter((key) => newTestament.includes(bibleData[key]?.book))
    .sort((a, b) => newTestament.indexOf(bibleData[a].book) - newTestament.indexOf(bibleData[b].book));

  return (
    <div className="flex gap-6 p-4">
      {/* Sidebar: Book list */}
      <div className="w-1/4 max-h-[80vh] border-r pr-4">
        <h2 className="font-bold mb-2">📖 Bible Books</h2>
        <ScrollArea className="h-[70vh] pr-2 space-y-4">
          {/* Old Testament */}
          <div>
            <h3 className="text-sm font-bold text-muted-foreground mb-1">📜 Old Testament</h3>
            <ul className="space-y-1">
              {oldBooks.map((key) => (
                <li
                  key={key}
                  onClick={() => handleBookClick(key)}
                  className={`cursor-pointer p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800 ${
                    selectedBookKey === key ? 'bg-blue-200 dark:bg-blue-700 font-semibold' : ''
                  }`}
                >
                  {bibleData[key]?.book}
                </li>
              ))}
            </ul>
          </div>

          {/* New Testament */}
          <div>
            <h3 className="text-sm font-bold text-muted-foreground mt-4 mb-1">✝️ New Testament</h3>
            <ul className="space-y-1">
              {newBooks.map((key) => (
                <li
                  key={key}
                  onClick={() => handleBookClick(key)}
                  className={`cursor-pointer p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800 ${
                    selectedBookKey === key ? 'bg-blue-200 dark:bg-blue-700 font-semibold' : ''
                  }`}
                >
                  {bibleData[key]?.book}
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      {/* Main panel: Chapters + Verses */}
      <div className="flex-1 space-y-4">
        {/* Search input */}
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
          <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>

        {/* Back Button */}
        {(selectedBookKey && (selectedChapterIndex !== null || selectedBookKey)) && (
          <button onClick={handleBack} className="text-blue-500 underline text-sm">
            ← Back
          </button>
        )}

        {/* Chapter list */}
        {selectedBook && selectedChapterIndex === null && (
          <div>
            <h3 className="text-lg font-bold mb-2">📘 {selectedBook.book} — Chapters</h3>
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

        {/* Verse display */}
        {selectedChapterIndex !== null && (
          <Card>
            <CardContent className="max-h-[50vh] overflow-y-auto space-y-2">
              <h4 className="text-md font-semibold mb-2">
                {selectedBook.book} {selectedBook.chapters[selectedChapterIndex].chapter}
              </h4>
              {verses.map((v, idx) => (
                <div
                  key={idx}
                  id={`verse-${idx}`}
                  className="text-sm leading-relaxed"
                >
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
