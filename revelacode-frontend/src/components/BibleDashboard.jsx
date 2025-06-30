import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

export default function BibleDashboard() {
  const [bibleData, setBibleData] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        const response = await fetch('/data/kjv.json');
        const data = await response.json();
        setBibleData(data);

        const uniqueBooks = [...new Set(data.map(v => v.book))];
        setBooks(uniqueBooks);
      } catch (error) {
        console.error('Failed to load Bible data:', error);
      }
    };

    fetchBibleData();
  }, []);

  const getChaptersForBook = (book) => {
    const chapters = bibleData
      .filter(v => v.book === book)
      .map(v => v.chapter);
    return [...new Set(chapters)].sort((a, b) => a - b);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setVerses([]);
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    const chapterVerses = bibleData.filter(
      v => v.book === selectedBook && v.chapter === chapter
    );
    setVerses(chapterVerses);
  };

  return (
    <div className="flex gap-6 p-4">
      {/* Sidebar: List of books */}
      <div className="w-1/4 max-h-[80vh] border-r pr-4">
        <h2 className="font-bold mb-2">📚 Books</h2>
        <ScrollArea className="h-[70vh] pr-2">
          <ul className="space-y-1">
            {books.map((book) => (
              <li
                key={book}
                onClick={() => handleBookClick(book)}
                className={`cursor-pointer p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800 ${
                  selectedBook === book ? 'bg-blue-200 dark:bg-blue-700 font-semibold' : ''
                }`}
              >
                {book}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Main panel: Chapters and Verses */}
      <div className="flex-1 space-y-4">
        {/* Chapters */}
        {selectedBook && (
          <div>
            <h3 className="text-lg font-bold mb-2">📖 {selectedBook} — Chapters</h3>
            <div className="flex flex-wrap gap-2">
              {getChaptersForBook(selectedBook).map((ch) => (
                <button
                  key={ch}
                  onClick={() => handleChapterClick(ch)}
                  className={`px-3 py-1 rounded border ${
                    selectedChapter === ch ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Verses */}
        {selectedChapter && (
          <Card>
            <CardContent className="max-h-[50vh] overflow-y-auto space-y-2">
              <h4 className="text-md font-semibold mb-2">
                {selectedBook} {selectedChapter}
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
