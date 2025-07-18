import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { usePreferences } from '@/context/PreferencesContext';
import { useHistory } from '@/context/HistoryContext';
import { useTheme } from './hooks/useTheme'; // optional: for theme toggle

export default function SettingsDashboard() {
  const { fontSize, setFontSize } = usePreferences();
  const { history } = useHistory();
  const { theme, setTheme } = useTheme(); // optional

  return (
    <Card className="shadow-md rounded-xl flex flex-col min-h-[80vh]">
      <CardHeader>
        <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
          ⚙️ Settings
        </h2>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">

        {/* Font size */}
        <section>
          <h3 className="font-medium mb-1">🔠 Font size</h3>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="p-2 rounded border w-full bg-background text-foreground"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </section>

        {/* Language */}
        <section>
          <h3 className="font-medium mb-1">🌐 Language</h3>
          <select className="p-2 rounded border w-full bg-background text-foreground">
            <option>English</option>
            <option>Swahili</option>
            <option>French</option>
          </select>
        </section>

        {/* Theme toggle */}
        <section>
          <h3 className="font-medium mb-1">🎨 Theme</h3>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            Toggle {theme === 'dark' ? '☀ Light' : '🌙 Dark'} Mode
          </button>
        </section>

        {/* AI Assistant */}
        <section>
          <h3 className="font-medium mb-1">🤖 AI Assistant</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">
            Open Assistant
          </button>
        </section>

        {/* Decoded History */}
        <section className="flex-1 overflow-y-auto">
          <h3 className="font-medium mb-1">📜 Decoded history</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {history.length ? (
              history.map((item) => {
                let parsed = {};
                try {
                  parsed = JSON.parse(item.output);
                } catch (e) {}

                return (
                  <div key={item.id} className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-sm">
                    <p className="font-semibold">🕒 {item.timestamp}</p>
                    <p className="truncate">Input: {item.input}</p>
                    {Array.isArray(parsed) && parsed.length > 0 && Object.keys(parsed[0]).length > 0 ? (
                      <p>🔮 Symbol: {Object.keys(parsed[0])[0]}</p>
                    ) : (
                      <p>⚠️ No symbol detected</p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No decoded history yet.</p>
            )}
          </div>
        </section>

        {/* Policy buttons */}
        <section className="flex gap-2">
          <a
            href="/privacy-policy"
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm text-center"
          >
            📜 Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm text-center"
          >
            📄 Terms of Service
          </a>
        </section>

        {/* Support (at the bottom) */}
        <div className="mt-auto pt-4 border-t">
          <h3 className="font-medium mb-1">📧 Support</h3>
          <a
            href="mailto:musombiwilliam769@gmail.com"
            className="text-blue-600 dark:text-blue-400 underline text-sm"
          >
            musombiwilliam769@gmail.com
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
