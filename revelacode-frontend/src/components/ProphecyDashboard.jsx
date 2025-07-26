import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { CopyIcon } from 'lucide-react';
import { useHistory } from '@/context/HistoryContext';

export default function ProphecyDashboard() {
  const { user, isGuest } = useAuth();
  const { addToHistory } = useHistory();

  const [searchInput, setSearchInput] = useState('');
  const [decodedData, setDecodedData] = useState([]);
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestDecodeCount, setGuestDecodeCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleDecode = async () => {
    if (!baseUrl) {
      alert("🚫 API URL not set. Check your VITE_API_URL in .env.");
      return;
    }

    if (isGuest && guestDecodeCount >= 5) {
      alert('⚠ Guest mode limit reached: Only 5 decodes per day.');
      return;
    }

    const trimmedInput = searchInput.trim();
    if (!trimmedInput) return;

    setLoading(true);
    setDecodedData([]);
    setTimestamp('');
    setCopied(false);

    try {
      const response = await fetch(`${baseUrl}/decode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verse: trimmedInput })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`❌ Server error ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (Array.isArray(data.decoded) && data.decoded.length > 0) {
        setDecodedData(data.decoded);
        const now = new Date().toLocaleString();
        setTimestamp(now);

        addToHistory?.({
          id: Date.now(),
          timestamp: now,
          input: trimmedInput,
          output: JSON.stringify(data.decoded, null, 2)
        });

        if (isGuest) setGuestDecodeCount(prev => prev + 1);
      } else {
        setDecodedData([{ message: '⚠️ No symbolic meaning detected in this prophecy.' }]);
      }
    } catch (error) {
      console.error('❌ Decode failed:', error.message || error);
      setDecodedData([{ message: '❌ Error decoding. Check server or try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(decodedData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderDecoded = () => {
    if (!decodedData.length) {
      return (
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          🧠 Your decoded prophecy will appear here.
        </p>
      );
    }

    return decodedData.map((entry, idx) => {
      const symbolKey = Object.keys(entry)[0];
      const data = entry[symbolKey] || {};

      return (
        <div key={idx} className="border-b pb-3 space-y-1">
          <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
            🔮 {symbolKey || data.symbol || 'Unknown Symbol'}
          </h3>
          {data.meaning && <p><strong>🗝 Meaning:</strong> {data.meaning}</p>}
          {data.interpretation && <p><strong>🧠 Interpretation:</strong> {data.interpretation}</p>}
          {data.status && <p><strong>🚦 Status:</strong> {data.status}</p>}
          {data.fulfilled && <p><strong>✅ Fulfilled:</strong> {data.fulfilled}</p>}
          {data.reference && <p className="text-blue-600 dark:text-blue-400">📖 {data.reference}</p>}
          {data.notes && <p className="italic text-gray-600 dark:text-gray-400">💡 {data.notes}</p>}
          {data.tags?.length > 0 && <p className="text-xs text-gray-500">Tags: {data.tags.join(', ')}</p>}
          {!data.meaning && entry.message && <p className="text-red-500">{entry.message}</p>}
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      {isGuest && (
        <p className="text-xs text-yellow-600 dark:text-yellow-400">
          ⚠ Guest mode: You can decode 5 prophecies per day. Used: {guestDecodeCount}/5
        </p>
      )}

      <Input
        placeholder="Enter prophecy, verse, or symbolic message..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="text-base w-full"
      />

      <Button
        onClick={handleDecode}
        disabled={loading || !searchInput.trim() || (isGuest && guestDecodeCount >= 5)}
        className="w-full"
      >
        {loading ? '🔄 Decoding...' : 'Decode'}
      </Button>

      <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-4">
        <CardHeader>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
            Decoded Prophecy
          </h2>
          <p className="text-sm text-gray-500">{timestamp || '🧠 Awaiting input...'}</p>
        </CardHeader>

        <CardContent className="space-y-3">
          {renderDecoded()}

          {decodedData.length > 0 && (
            <div className="flex justify-end">
              <Button variant="ghost" onClick={handleCopy}>
                <CopyIcon className="mr-2 h-4 w-4" />
                {copied ? 'Copied!' : 'Copy All'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
