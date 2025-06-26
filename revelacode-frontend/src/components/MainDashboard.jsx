// MainDashboard.jsx
import React from 'react';
import {
  BookOpen,
  Search,
  Settings,
  Link2,
  Info
} from 'lucide-react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/Tabs';
import {
  Card,
  CardContent
} from '@/components/ui/Card';

import BibleDashboard from './BibleDashboard';
import ProphecyDashboard from './ProphecyDashboard';
import SettingsDashboard from './SettingsDashboard';
import AccountDashboard from './AccountDashboard';
import ReferentialDashboard from './ReferentialDashboard';

export default function MainDashboard() {
  return (
    <div className="p-4 space-y-6">
      <Tabs defaultValue="bible" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 overflow-x-auto">
          <TabsTrigger value="bible" aria-label="Open Bible Dashboard">
            <BookOpen className="inline mr-2" /> Bible
          </TabsTrigger>
          <TabsTrigger value="prophecy" aria-label="Open Prophecy Dashboard">
            <Search className="inline mr-2" /> Prophecy
          </TabsTrigger>
          <TabsTrigger value="settings" aria-label="Open Settings">
            <Settings className="inline mr-2" /> Settings
          </TabsTrigger>
          <TabsTrigger value="accounts" aria-label="Manage Linked Accounts">
            <Link2 className="inline mr-2" /> Accounts
          </TabsTrigger>
          <TabsTrigger value="referential" aria-label="Reference Tools">
            <Info className="inline mr-2" /> Referential
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bible">
          <Card>
            <CardContent className="p-4">
              <BibleDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prophecy">
          <Card>
            <CardContent className="p-4">
              <ProphecyDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-4">
              <SettingsDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardContent className="p-4">
              <AccountDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referential">
          <Card>
            <CardContent className="p-4">
              <ReferenceDashboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
