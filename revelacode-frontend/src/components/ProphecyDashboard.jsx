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
  const [decodedOutput, setDecodedOutput] = useState('');
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
    setDecodedOutput('');
    setTimestamp('');

    try {
      const response = await fetch(`${baseUrl}/decode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verse: trimmedInput })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (data?.decoded && typeof data.decoded === 'object') {
        const formatted = JSON.stringify(data.decoded, null, 2);
        setDecodedOutput(formatted);
        setTimestamp(new Date().toLocaleString());

        addToHistory({
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          input: trimmedInput,
          output: formatted
        });

        if (isGuest) {
          setGuestDecodeCount(prev => prev + 1);
        }

      } else {
        setDecodedOutput('⚠️ No symbolic meaning detected.');
      }
    } catch (error) {
      console.error('Decode error:', error);
      setDecodedOutput('❌ Error connecting to decoder. Please try again.');
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

      {/* Display output */}
      <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-4">
        <CardHeader>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
            Decoded Prophecy
          </h2>
          <p className="text-sm text-gray-500">{timestamp || '🧠 Awaiting input...'}</p>
        </CardHeader>
        <CardContent>
          {decodedOutput ? (
            <pre className="text-xs whitespace-pre-wrap">{decodedOutput}</pre>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              🧠 Your decoded prophecy will appear here.
            </p>
          )}
          {decodedOutput && (
            <div className="flex justify-end mt-3">
              <Button variant="ghost" onClick={() => navigator.clipboard.writeText(decodedOutput)}>
                <CopyIcon className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
