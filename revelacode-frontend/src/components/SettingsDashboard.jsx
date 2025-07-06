import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useHistory } from '@/context/HistoryContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function SettingsDashboard() {
  const { theme, setTheme } = useTheme();
  const { history } = useHistory();
  const [showHistory, setShowHistory] = useState(true);
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'md';
  });
  const [aiEnabled, setAiEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const handleSupportClick = () => {
    window.open('https://wa.me/+254742466828', '_blank');
  };

  const fontSizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[fontSize];

  return (
    <Card className="w-full shadow rounded-xl">
      <CardContent
        className={`p-6 space-y-6 transition-colors duration-300 ${fontSizeClass} 
        bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <h2 className="text-2xl font-bold text-center">⚙️ User Settings</h2>

        {/* Theme Switcher */}
        <div className="flex items-center justify-between">
          <Label>🌗 Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="flex items-center justify-between">
          <Label>🔠 Font Size</Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Assistant Toggle */}
        <div className="flex items-center justify-between">
          <Label>🤖 AI Assistant</Label>
          <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        {/* History Toggle */}
        <div className="flex items-center justify-between">
          <Label>📜 Show Decode History</Label>
          <Switch checked={showHistory} onCheckedChange={setShowHistory} />
        </div>

        {showHistory && (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 border-t pt-4">
            <h3 className="text-lg font-semibold text-indigo-600">🕓 Decode History</h3>
            {history.length === 0 ? (
              <p className="text-gray-500">No decoded prophecies yet.</p>
            ) : (
              history.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-muted/30 rounded-lg p-4 shadow-sm hover:bg-muted/50 transition"
                >
                  <p className="text-xs text-indigo-500">{entry.timestamp}</p>
                  <p className="text-sm font-semibold">🔍 {entry.input}</p>
                  <pre className="text-xs text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                    {JSON.parse(entry.output)?.[0]
                      ? Object.entries(JSON.parse(entry.output)?.[0])[0][1].meaning
                      : entry.output}
                  </pre>
                </div>
              ))
            )}
          </div>
        )}

        {/* Support */}
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={handleSupportClick}
            className="dark:border-gray-600 dark:hover:bg-gray-700"
          >
            🆘 Contact Support via WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
