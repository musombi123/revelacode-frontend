import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

export default function ProphecyDashboard() {
  const [searchInput, setSearchInput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleDecode = async () => {
    const trimmedInput = searchInput.trim();
    if (!trimmedInput) return;

    setLoading(true);
    setDecodedOutput('');

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

        <div className="bg-muted/50 p-4 rounded-xl min-h-[120px] text-sm whitespace-pre-wrap">
          {decodedOutput || '🧠 Your decoded prophecy will appear here.'}
        </div>
      </CardContent>
    </Card>
  );
}
