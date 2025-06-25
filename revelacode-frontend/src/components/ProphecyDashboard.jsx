import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function ProphecyDashboard() {
  const [searchInput, setSearchInput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDecode = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    setDecodedOutput('');
  
    try {
      const response = await fetch('https://revelacode-backend.onrender.com/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verse: searchInput })
      });
  
      const data = await response.json();
      setDecodedOutput(data.decoded || 'No result found.');
    } catch (error) {
      setDecodedOutput('❌ Error decoding prophecy. Please try again.');
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
          className="text-base"
        />
        <Button onClick={handleDecode} disabled={loading}>
          {loading ? 'Decoding...' : 'Decode'}
        </Button>
        <div className="bg-muted p-4 rounded-xl min-h-[100px] text-sm whitespace-pre-wrap">
          {decodedOutput || 'Your decoded prophecy will appear here.'}
        </div>
      </CardContent>
    </Card>
  );
}
