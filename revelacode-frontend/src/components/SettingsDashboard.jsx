import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { usePreferences } from '@/context/PreferencesContext';
import { useHistory } from '@/context/HistoryContext';
import { useTheme } from './hooks/useTheme';

export default function SettingsDashboard() {
  const { fontSize, setFontSize } = usePreferences();
  const { history } = useHistory();
  const { theme, setTheme } = useTheme();

  return (
    <Card className="shadow-lg rounded-xl flex flex-col min-h-[80vh] overflow-hidden">
      <CardHeader>
        <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
          ⚙️ Settings & Preferences
        </h2>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-6">

        {/* === Appearance === */}
        <section>
          <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">🔠 Font Size</h3>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full border rounded p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </section>

        <section>
          <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">🌐 Language</h3>
          <select
            className="w-full border rounded p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option>English</option>
            <option>Swahili</option>
            <option>French</option>
          </select>
        </section>

        <section>
          <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">🎨 Theme</h3>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm"
          >
            {theme === 'dark' ? '☀ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
        </section>

        <section>
          <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">🤖 AI Assistant</h3>
          <button
            onClick={() => alert("Hi, I’m RevelaAI. This feature is coming soon.")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm"
          >
            Launch Assistant
          </button>
        </section>

        {/* === History Section === */}
        <section className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">📜 Decode History</h3>
          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
            {history.length > 0 ? (
              history.map((item) => {
                let parsed = {};
                try {
                  parsed = JSON.parse(item.output);
                } catch (_) {}

                return (
                  <div
                    key={item.id}
                    className="p-2 border rounded text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <p className="font-semibold text-gray-800 dark:text-gray-100">🕒 {item.timestamp}</p>
                    <p className="truncate text-gray-600 dark:text-gray-400">Input: {item.input}</p>
                    {Array.isArray(parsed) && parsed.length && Object.keys(parsed[0]).length > 0 ? (
                      <p className="text-green-600 dark:text-green-400">🔮 Symbol: {Object.keys(parsed[0])[0]}</p>
                    ) : (
                      <p className="text-yellow-600 dark:text-yellow-400">⚠️ No symbol detected</p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No decoded history yet.</p>
            )}
          </div>
        </section>

        {/* === Legal Section === */}
        <section className="flex flex-wrap gap-2">
          <a
            href="/privacy-policy"
            className="flex-1 text-center px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:underline"
          >
            📜 Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="flex-1 text-center px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:underline"
          >
            📄 Terms of Service
          </a>
        </section>

        {/* === Support Section === */}
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">📧 Support</h3>
          <a
            href="mailto:musombiwilliam769@gmail.com"
            className="text-blue-600 dark:text-blue-400 underline text-sm"
          >
            Email Support
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
