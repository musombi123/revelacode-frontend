import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme'; // ✅ custom hook
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
  const { theme, setTheme } = useTheme(); // ✅ uses your hook
  const [showHistory, setShowHistory] = useState(true);
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'md';
  });
  
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);
  const [aiEnabled, setAiEnabled] = useState(true);

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

        {/* History Toggle */}
        <div className="flex items-center justify-between">
          <Label>📜 History</Label>
          <Switch checked={showHistory} onCheckedChange={setShowHistory} />
        </div>

        {showHistory && (
          <div className="p-3 rounded bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <p>This is your recent history (placeholder).</p>
          </div>
        )}

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
