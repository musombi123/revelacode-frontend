import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProphecyEventsDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <CardContent className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <Clock className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" />
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
              🌍 Global Prophecy Events
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base">
              Track real-world events that fulfill or relate to decoded prophecies.
            </p>
          </div>

          {/* Preview sample event with gentle pulse */}
          <motion.div
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
              ✨ Sample Event
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Major earthquake predicted in symbolic prophecy has occurred in region XYZ.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Date: 2025-08-12</p>
          </motion.div>

          {/* Coming soon note */}
          <div className="p-3 bg-gray-50 dark:bg-gray-600 rounded">
            <p className="text-gray-500 dark:text-gray-300 text-xs italic text-center">
              🚧 More live events coming soon... stay tuned!
            </p>
          </div>

          {/* Suggest event button */}
          <div className="text-center">
            <Button
              variant="outline"
              className="dark:border-gray-600 dark:hover:bg-gray-700"
              onClick={() => alert('Feature coming soon!')}
            >
              ✏️ Suggest an Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
