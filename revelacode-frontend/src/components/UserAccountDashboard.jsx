import React from 'react';
import DashboardCard from './common/DashboardCard';
import { Settings, Link2, Info } from 'lucide-react';

export default function UserAccountDashboard({ onOpenSettings, onOpenAccounts, onOpenReferential }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <DashboardCard
        onClick={onOpenSettings}
        title="Settings"
        Icon={Settings}
        color="bg-green-600 dark:bg-green-500"
      />
      <DashboardCard
        onClick={onOpenAccounts}
        title="Accounts"
        Icon={Link2}
        color="bg-pink-600 dark:bg-pink-500"
      />
      <DashboardCard
        onClick={onOpenReferential}
        title="Referential"
        Icon={Info}
        color="bg-yellow-600 dark:bg-yellow-500"
      />
    </div>
  );
}
