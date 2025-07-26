import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Search, Menu, Bell, Sun, Moon, UserCircle } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from './hooks/useTheme';
import DashboardCard from './common/DashboardCard';
import BackButton from './common/BackButton';
import Loading from './common/Loading';
import LoginModal from './LoginModal';
import ProphecyEventsDashboard from './ProphecyEventsDashboard';

// Lazy-loaded dashboards
const BibleDashboard = React.lazy(() => import('./BibleDashboard'));
const ProphecyDashboard = React.lazy(() => import('./ProphecyDashboard'));
const SettingsDashboard = React.lazy(() => import('./SettingsDashboard'));
const ReferentialDashboard = React.lazy(() => import('./ReferentialDashboard'));
const AccountDashboard = React.lazy(() => import('./AccountDashboard'));
const UserAccountDashboard = React.lazy(() => import('./UserAccountDashboard'));

export default function MainDashboard() {
  const [activeView, setActiveView] = useState('main');
  const [showLogin, setShowLogin] = useState(false);
  const { user, isGuest, loading } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!user && !isGuest) setShowLogin(true);
  }, [user, isGuest]);

  const goBack = () => setActiveView('main');

  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">

      {/* === Top-right Toolbar === */}
      {(user || isGuest) && (
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
          {/* Notifications (placeholder) */}
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full" title="Notifications">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Theme Toggle */}
          <button
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            title="Toggle Theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* User Profile / Avatar */}
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() || <UserCircle className="w-6 h-6" />}
          </div>

          {/* Menu Button for More */}
          <button
            onClick={() => setActiveView('userAccount')}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            title="More Options"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      )}

      {/* === Main View or Sub Views === */}
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
            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
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
            </div>

            {/* Always visible events feed */}
            <ProphecyEventsDashboard />
          </motion.div>
        )}

        {/* Subdashboards */}
        {['bible', 'prophecy', 'settings', 'referential', 'accounts', 'userAccount'].includes(activeView) && (
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
                {activeView === 'userAccount' && (
                  <UserAccountDashboard
                    onOpenSettings={() => setActiveView('settings')}
                    onOpenAccounts={() => setActiveView('accounts')}
                    onOpenReferential={() => setActiveView('referential')}
                  />
                )}
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
