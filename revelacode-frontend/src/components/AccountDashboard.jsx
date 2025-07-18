import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  Bot,
  Twitter,
  Mail
} from 'lucide-react';

const baseUrl = import.meta.env.VITE_API_URL;

export default function AccountDashboard() {
  const platforms = [
    { name: 'Google', icon: <Mail className="mr-2" />, connected: false, oauth: true },
    { name: 'Facebook', icon: <Facebook className="mr-2" />, connected: false, oauth: true },
    { name: 'Instagram', icon: <Instagram className="mr-2" />, connected: false, oauth: false },
    { name: 'TikTok', icon: <MessageCircle className="mr-2" />, connected: false, oauth: false },
    { name: 'LinkedIn', icon: <Linkedin className="mr-2" />, connected: false, oauth: true },
    { name: 'Twitter', icon: <Twitter className="mr-2" />, connected: false, oauth: true },
    { name: 'WhatsApp', icon: <MessageCircle className="mr-2" />, connected: false, oauth: false },
    { name: 'ChatGPT', icon: <Bot className="mr-2" />, connected: true, oauth: false }
  ];

  const handleConnect = (platformName) => {
    const oauthRoutes = {
      Google: `${baseUrl}/auth/google`,
      Facebook: `${baseUrl}/auth/facebook`,
      Twitter: `${baseUrl}/auth/twitter`,
      LinkedIn: `${baseUrl}/auth/linkedin`
    };

    const redirectUrl = oauthRoutes[platformName];
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert(`OAuth login not available for ${platformName}`);
    }
  };

  return (
    <Card className="w-full shadow-md rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center">🔗 Account Integrations</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800 transition-colors"
            >
              <span className="flex items-center font-medium text-gray-800 dark:text-gray-100">
                {platform.icon}
                {platform.name}
              </span>
              <Button
                size="sm"
                variant={platform.connected ? 'secondary' : 'default'}
                disabled={platform.connected}
                onClick={() => handleConnect(platform.name)}
              >
                {platform.connected ? 'Connected' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs">
          Link your accounts to personalize prophecy sharing, sync history, and unlock more features.
        </p>
      </CardContent>
    </Card>
  );
}
