import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { CopyIcon } from 'lucide-react';
import { useHistory } from '@/context/HistoryContext';

export default function ProphecyDashboard() {
  const { addToHistory } = useHistory();
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

      if (Array.isArray(data?.decoded)) {
        setDecodedOutput(data.decoded); // save as parsed array
        setTimestamp(new Date().toLocaleString());

        addToHistory({
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          input: trimmedInput,
          output: data.decoded   // save structured data
        });
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
    if (decodedOutput && Array.isArray(decodedOutput)) {
      navigator.clipboard.writeText(JSON.stringify(decodedOutput, null, 2));
    }
  };

  const parsedOutput = (decodedArray) => {
    if (!Array.isArray(decodedArray)) return <p>No decoded symbols found.</p>;

    return decodedArray.map((item, idx) => {
      const symbolKey = Object.keys(item)[0];
      const data = item[symbolKey];

      return (
        <div key={idx} className="space-y-2 text-sm border-b pb-2 mb-2">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
            🔮 Symbol: {symbolKey}
          </h3>
          <p><strong>🗝️ Meaning:</strong> {data.meaning}</p>
          <p><strong>📖 Reference:</strong> {data.reference}</p>
          <p><strong>🧠 Interpretation:</strong> {data.interpretation}</p>
          <p><strong>🚦 Status:</strong> {data.status}</p>
          <p><strong>📌 Tags:</strong> {data.tags?.join(', ')}</p>
          <p><strong>📝 Notes:</strong> {data.notes}</p>
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
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

      <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-4">
        <CardHeader>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
            Decoded Prophecy
          </h2>
          <p className="text-sm text-gray-500">{timestamp || '🧠 Awaiting input...'}</p>
        </CardHeader>
        <CardContent>
          {Array.isArray(decodedOutput)
            ? parsedOutput(decodedOutput)
            : <p className="text-gray-600 dark:text-gray-300 text-sm">{decodedOutput}</p>}

          {Array.isArray(decodedOutput) && (
            <div className="flex justify-end mt-3">
              <Button variant="ghost" onClick={handleCopy}>
                <CopyIcon className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
