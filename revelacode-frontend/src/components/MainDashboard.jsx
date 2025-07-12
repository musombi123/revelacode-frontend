import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, Settings, Link2, Info, Menu
} from 'lucide-react';
import ProphecyEventsDashboard from './ProphecyEventsDashboard';

// Lazy load dashboards
const BibleDashboard = lazy(() => import('./BibleDashboard'));
const ProphecyDashboard = lazy(() => import('./ProphecyDashboard'));
const SettingsDashboard = lazy(() => import('./SettingsDashboard'));
const AccountDashboard = lazy(() => import('./AccountDashboard'));
const ReferentialDashboard = lazy(() => import('./ReferentialDashboard'));

export default function MainDashboard() {
  const [activeView, setActiveView] = useState('main');

  const goBack = () => setActiveView('main');

  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <AnimatePresence mode="wait">
        {activeView === 'main' && (
          <motion.div
            key="main"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Top grid of cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <DashboardCard
                onClick={() => setActiveView('bible')}
                title="Bible"
                Icon={BookOpen}
                color="bg-blue-600 dark:bg-blue-500"
              />
              <DashboardCard
                onClick={() => setActiveView('prophecy')}
                title="Prophecy"
                Icon={Search}
                color="bg-purple-600 dark:bg-purple-500"
              />
              <DashboardCard
                onClick={() => setActiveView('menu')}
                title="More"
                Icon={Menu}
                color="bg-gray-700 dark:bg-gray-600"
              />
            </div>

            {/* Bottom: Prophecy Events */}
            <ProphecyEventsDashboard />
          </motion.div>
        )}

        {activeView === 'menu' && (
          <motion.div
            key="menu"
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <BackButton onClick={goBack} />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <DashboardCard
                onClick={() => setActiveView('settings')}
                title="Settings"
                Icon={Settings}
                color="bg-green-600 dark:bg-green-500"
              />
              <DashboardCard
                onClick={() => setActiveView('referential')}
                title="Referential"
                Icon={Info}
                color="bg-yellow-600 dark:bg-yellow-500"
              />
              <DashboardCard
                onClick={() => setActiveView('accounts')}
                title="Accounts"
                Icon={Link2}
                color="bg-pink-600 dark:bg-pink-500"
              />
            </div>
          </motion.div>
        )}

        {['bible', 'prophecy', 'settings', 'referential', 'accounts'].includes(activeView) && (
          <motion.div
            key={activeView}
            variants={fadeVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <BackButton onClick={goBack} />
            <div className="mt-4 bg-white dark:bg-gray-800 rounded shadow p-4 transition-colors duration-300">
              <Suspense fallback={<Loading />}>
                {activeView === 'bible' && <BibleDashboard />}
                {activeView === 'prophecy' && <ProphecyDashboard />}
                {activeView === 'settings' && <SettingsDashboard />}
                {activeView === 'referential' && <ReferentialDashboard />}
                {activeView === 'accounts' && <AccountDashboard />}
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ⭐ Compact & dark-friendly card component
function DashboardCard({ onClick, title, Icon, color }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-lg text-white hover:scale-105 transform transition ${color} shadow-md dark:shadow dark:shadow-black/40`}
    >
      <Icon className="w-8 h-8 mb-1" />
      <span className="font-semibold text-base">{title}</span>
    </button>
  );
}

// ⭐ Back button
function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
    >
      ← <span className="ml-1">Back</span>
    </button>
  );
}

// ⭐ Loading fallback
function Loading() {
  return (
    <div className="flex justify-center items-center p-10 text-gray-500 dark:text-gray-400">
      Loading...
    </div>
  );
}
