import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { usePreferences } from '@/context/PreferencesContext';
import { useHistory } from '@/context/HistoryContext';

export default function SettingsDashboard() {
  const { fontSize, setFontSize } = usePreferences();
  const { history } = useHistory();

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
          ⚙️ Settings
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* i. Support */}
        <section>
          <h3 className="font-medium mb-1">📧 Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Prefer email: <a href="mailto:musombiwilliam769@gmail.com" className="text-blue-600 dark:text-blue-400 underline">musombiwilliam769@gmail.com</a>
          </p>
        </section>

        {/* ii. Font size */}
        <section>
          <h3 className="font-medium mb-1">🔠 Font size</h3>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="p-2 rounded border bg-background text-foreground"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </section>

        {/* iii & iv */}
        <section className="flex gap-2">
          <button className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm">📜 Privacy Policy</button>
          <button className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm">📄 Terms of Services</button>
        </section>

        {/* v. Languages */}
        <section>
          <h3 className="font-medium mb-1">🌐 Language</h3>
          <select className="p-2 rounded border bg-background text-foreground">
            <option>English</option>
            <option>Swahili</option>
            <option>French</option>
            {/* add more if needed */}
          </select>
        </section>

        {/* vi. Theme */}
        <section>
          <h3 className="font-medium mb-1">🎨 Theme</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Switch theme from light/dark in app header (or settings if you have custom switch)
          </p>
        </section>

        {/* vii. AI Assistant */}
        <section>
          <h3 className="font-medium mb-1">🤖 AI Assistant</h3>
          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Open Assistant</button>
        </section>

        {/* viii. Decoded history */}
        <section>
          <h3 className="font-medium mb-1">📜 Decoded history</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {history.length ? (
              history.map((item) => {
                let parsed = {};
                try {
                  parsed = JSON.parse(item.output);
                } catch (e) { parsed = {}; }

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
      </CardContent>
    </Card>
  );
}
