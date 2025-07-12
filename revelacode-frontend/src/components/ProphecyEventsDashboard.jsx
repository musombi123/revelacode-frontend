import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock } from 'lucide-react';

export default function ProphecyEventsDashboard() {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <CardContent className="p-6 text-center space-y-4">
        <Clock className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" />
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
          🌍 Global Prophecy Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base">
          Track real-world events that fulfill or relate to decoded prophecies.
        </p>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300 text-sm italic">
            🚧 Coming soon... stay tuned!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
