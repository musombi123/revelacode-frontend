import React, { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Search, Menu } from 'lucide-react';

import { useAuth } from './hooks/useAuth'; // make sure this is correct
import DashboardCard from './common/DashboardCard';
import BackButton from './common/BackButton';
import Loading from './common/Loading';
import LoginModal from './LoginModal';
import ProphecyEventsDashboard from './ProphecyEventsDashboard';

// Lazy loaded dashboards
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

  const goBack = () => setActiveView('main');

  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

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
            {/* More button */}
            {(user && !isGuest) && (
              <div className="flex justify-start">
                <button
                  onClick={() => setActiveView('userAccount')}
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                >
                  <Menu className="w-5 h-5" />
                  <span className="text-sm font-medium">More</span>
                </button>
              </div>
            )}

            {/* Dashboard Cards */}
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
            </div>

            {/* Live Events from backend */}
            <ProphecyEventsDashboard />
          </motion.div>
        )}

        {/* Sub Dashboards */}
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

      {/* Auth */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
