import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Settings,
  Link2,
  Info
} from 'lucide-react';

import BibleDashboard from './BibleDashboard.jsx';
import ProphecyDashboard from './ProphecyDashboard.jsx';
import SettingsDashboard from './SettingsDashboard.jsx';
import AccountDashboard from './AccountDashboard.jsx';
import ReferentialDashboard from './ReferentialDashboard.jsx';

const tabs = [
  { value: 'bible', label: 'Bible', icon: BookOpen },
  { value: 'prophecy', label: 'Prophecy', icon: Search },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'accounts', label: 'Accounts', icon: Link2 },
  { value: 'referential', label: 'Referential', icon: Info },
];

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('bible');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bible':
        return <BibleDashboard />;
      case 'prophecy':
        return <ProphecyDashboard />;
      case 'settings':
        return <SettingsDashboard />;
      case 'accounts':
        return <AccountDashboard />;
      case 'referential':
        return <ReferentialDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white dark:bg-zinc-900 transition-colors duration-300">
      {/* Tab Navigation */}
      <div className="flex-shrink-0 p-4 overflow-x-auto border-b border-gray-200 dark:border-zinc-800">
        <div className="flex space-x-4 w-max">
          {tabs.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition duration-300 ${
                activeTab === value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Content */}
      <div className="flex-grow p-6 overflow-auto animate-fade-in transition-opacity duration-500">
        {renderTabContent()}
      </div>
    </div>
  );
}
