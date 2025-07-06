import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { CopyIcon } from 'lucide-react';

export default function ProphecyDashboard() {
  const [searchInput, setSearchInput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleDecode = async () => {
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
        setDecodedOutput(JSON.stringify(data.decoded, null, 2));
        setTimestamp(new Date().toLocaleString());
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

  const handleCopy = () => {
    if (decodedOutput) {
      navigator.clipboard.writeText(decodedOutput);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter prophecy, verse, or question..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="text-base w-full"
        />
        <Button
          onClick={handleDecode}
          disabled={loading || !searchInput.trim()}
          className="w-full"
        >
          {loading ? '🔄 Decoding...' : 'Decode'}
        </Button>

        {/* Decoded Result Display */}
        <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-4">
          <CardHeader>
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              Decoded Prophecy
            </h2>
            <p className="text-sm text-gray-500">{timestamp || '🧠 Awaiting input...'}</p>
          </CardHeader>
          <CardContent>
            <pre className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap text-sm">
              {decodedOutput || '🧠 Your decoded prophecy will appear here.'}
            </pre>
            {decodedOutput && (
              <div className="flex justify-end mt-3">
                <Button variant="ghost" onClick={handleCopy}>
                  <CopyIcon className="mr-2 h-4 w-4" /> Copy
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
