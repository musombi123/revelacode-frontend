// src/components/ui/Tabs.jsx
import React, { useState } from 'react';

export function Tabs({ defaultValue, children, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsList({ children, className = '' }) {
  return <div className={`flex gap-2 mb-4 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, activeTab, setActiveTab, children }) {
  const active = value === activeTab;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children }) {
  return value === activeTab ? <div>{children}</div> : null;
}
