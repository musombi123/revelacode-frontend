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

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleDecode = async () => {
    if (isGuest && guestDecodeCount >= 5) {
      alert('⚠ Guest mode limit reached: Only 5 decodes per day.');
      return;
    }

    const trimmedInput = searchInput.trim();
    if (!trimmedInput) return;

    setLoading(true);
    setDecodedData([]);
    setTimestamp('');

    try {
      const response = await fetch(`${baseUrl}/decode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verse: trimmedInput })
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      const data = await response.json();

      if (Array.isArray(data.decoded)) {
        const parsed = data.decoded.map((entry) => Object.values(entry)[0]);
        setDecodedData(parsed);
        setTimestamp(new Date().toLocaleString());

        addToHistory({
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          input: trimmedInput,
          output: JSON.stringify(data.decoded)
        });

        if (isGuest) setGuestDecodeCount((prev) => prev + 1);
      } else {
        setDecodedData([{ meaning: '⚠️ No symbolic meaning detected.' }]);
      }
    } catch (error) {
      console.error('Decode error:', error);
      setDecodedData([{ meaning: '❌ Error connecting to decoder. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {isGuest && (
        <p className="text-xs text-yellow-600 dark:text-yellow-400">
          ⚠ Guest mode: You can only decode 5 prophecies per day. Used: {guestDecodeCount}/5
        </p>
      )}

      <Input
        placeholder="Enter prophecy, verse, or question..."
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
        <CardContent>
          {decodedData.length ? (
            <div className="space-y-4">
              {decodedData.map((symbol, idx) => (
                <div key={idx} className="border-b pb-3">
                  <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {symbol.symbol || 'Unknown Symbol'}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Meaning:</strong> {symbol.meaning}
                  </p>
                  {symbol.interpretation && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Interpretation:</strong> {symbol.interpretation}
                    </p>
                  )}
                  {symbol.status && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Status:</strong> {symbol.status}
                    </p>
                  )}
                  {symbol.fulfilled && symbol.fulfilled !== 'N/A' && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Fulfilled:</strong> {symbol.fulfilled}
                    </p>
                  )}
                  {symbol.notes && (
                    <p className="text-sm italic text-gray-600 dark:text-gray-400">
                      💡 {symbol.notes}
                    </p>
                  )}
                  {symbol.reference && (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      📖 {symbol.reference}
                    </p>
                  )}
                  {symbol.tags?.length && (
                    <p className="text-xs mt-1 text-gray-500">
                      Tags: {symbol.tags.join(', ')}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(decodedData, null, 2))}
                >
                  <CopyIcon className="mr-2 h-4 w-4" /> Copy All
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              🧠 Your decoded prophecy will appear here.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
