import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ReferentialDashboard() {
  return (
    <Card className="w-full shadow-lg rounded-2xl">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">📚 Referential Tools</h2>
        <ScrollArea className="h-[300px] p-2 rounded-md border">
          <ul className="space-y-3">
            <li>🔍 Biblical cross-references (coming soon)</li>
            <li>📖 Verse-level commentary & historical context</li>
            <li>🧠 Symbol & number decoding database (future AI module)</li>
            <li>🕰️ Timeline and prophecy connection visualizations</li>
            <li>🗂️ Hebrew/Greek root word tracing</li>
            <li>🤖 AI suggestions and theological correlation (RevelaAI v2)</li>
          </ul>
        </ScrollArea>
        <p className="text-sm text-muted-foreground text-center">Updates and new features will roll out soon.</p>
      </CardContent>
    </Card>
  );
}
