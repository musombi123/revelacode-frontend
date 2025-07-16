// ... same imports
export default function MainDashboard() {
  const [activeView, setActiveView] = useState('main');
  const [showLogin, setShowLogin] = useState(false);
  const { user, isGuest, loading } = useAuth();

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
            {/* Top-left More button */}
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

            {/* Main grid */}
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

            {/* Events always visible */}
            <ProphecyEventsDashboard />
          </motion.div>
        )}

        {/* Single dashboards */}
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
