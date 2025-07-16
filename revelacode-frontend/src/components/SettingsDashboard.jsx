import React, { useState } from 'react';
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
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('md');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [historyVisible, setHistoryVisible] = useState(true);

  return (
    <Card className="w-full shadow rounded-xl">
      <CardContent className="p-6 space-y-6 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold text-center">⚙️ Settings & Preferences</h2>

        {/* Support */}
        <div className="flex items-center justify-between">
          <Label>📧 Support</Label>
          <Button
            variant="outline"
            onClick={() => window.open('mailto:musombiwilliam769@gmail.com')}
            className="dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Email Us
          </Button>
        </div>

        {/* Font size */}
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

        {/* Theme */}
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

        {/* AI Assistant */}
        <div className="flex items-center justify-between">
          <Label>🤖 AI Assistant</Label>
          <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        {/* Decoded History */}
        <div className="flex items-center justify-between">
          <Label>📜 Show Decode History</Label>
          <Switch checked={historyVisible} onCheckedChange={setHistoryVisible} />
        </div>

        {/* Privacy policy */}
        <div className="pt-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>🔒 <span className="underline cursor-pointer">Privacy Policy</span></p>
          <p>📄 <span className="underline cursor-pointer">Terms of Service</span></p>
          <p>🌐 <span className="underline cursor-pointer">Languages</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
