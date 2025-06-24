import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, BookOpen, Settings, Link2, Info } from 'lucide-react';

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');

  const handleDecode = async () => {
    try {
      const response = await fetch('https://revelacode-backend.onrender.com/api/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchInput })
      });
      const data = await response.json();
      setDecodedOutput(data.result || 'No result found.');
    } catch (error) {
      setDecodedOutput('Error decoding prophecy.');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Tabs defaultValue="bible" className="w-full">
        <TabsList className="grid grid-cols-5 gap-2">
          <TabsTrigger value="bible"><BookOpen className="inline mr-2" />Bible</TabsTrigger>
          <TabsTrigger value="prophecy"><Search className="inline mr-2" />Prophecy</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="inline mr-2" />Settings</TabsTrigger>
          <TabsTrigger value="accounts"><Link2 className="inline mr-2" />Accounts</TabsTrigger>
          <TabsTrigger value="referential"><Info className="inline mr-2" />Referential</TabsTrigger>
        </TabsList>

        <TabsContent value="bible">
          <Card>
            <CardContent className="p-4">📖 Scripture viewer will be integrated here.</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prophecy">
          <Card>
            <CardContent className="space-y-4 p-4">
              <Input 
                placeholder="Enter prophecy or verse..." 
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)} 
              />
              <Button onClick={handleDecode}>Decode</Button>
              <div className="bg-muted p-3 rounded-xl min-h-[80px]">{decodedOutput}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-4">⚙️ Settings panel: History, Theme, Support, etc. (Coming soon)</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardContent className="p-4">🔗 Link accounts like TikTok, ChatGPT, WhatsApp, etc.</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referential">
          <Card>
            <CardContent className="p-4">📚 Referential data: cross-references, commentary, etc.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
