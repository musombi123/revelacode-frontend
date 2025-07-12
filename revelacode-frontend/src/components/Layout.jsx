import { usePreferences } from '@/context/PreferencesContext';

function YourAppContent() {
  const { fontSize } = usePreferences();

  const fontSizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[fontSize];

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${fontSizeClass}`}>
      {/* your app routes / dashboard */}
    </div>
  );
}
