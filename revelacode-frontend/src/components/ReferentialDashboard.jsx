import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

export default function ReferentialDashboard() {
  return (
    <Card className="w-full shadow-lg rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">📚 Referential Tools</h2>

        <ScrollArea className="h-[300px] p-2 rounded-md border bg-muted/30">
          <ul className="space-y-3 text-sm leading-relaxed">
            <li>
              🔍 <strong>Biblical Cross-References:</strong> Navigate themes & connected verses (coming soon)
            </li>
            <li>
              📖 <strong>Commentary & Historical Context:</strong> Understand the time, place, and language
            </li>
            <li>
              🧠 <strong>Symbol/Number Decoder:</strong> Explore AI-tagged symbols in scripture (planned)
            </li>
            <li>
              🕰️ <strong>Prophetic Timeline Viewer:</strong> Interactive map of events and predictions
            </li>
            <li>
              🗂️ <strong>Root Word Explorer:</strong> Hebrew / Greek origin and original meaning
            </li>
            <li>
              🤖 <strong>AI-Assisted Insights:</strong> RevelaAI v2 - correlation to doctrine and themes
            </li>
          </ul>
        </ScrollArea>

        <p className="text-sm text-muted-foreground text-center">
          🚧 New tools will roll out gradually — stay tuned!
        </p>
      </CardContent>
    </Card>
  );
}
