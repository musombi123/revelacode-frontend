import React from 'react';
import { cn } from '@/lib/utils'; // Optional: replace with classnames or remove if not using

export default function DashboardCard({ title, Icon, color = 'bg-indigo-600', onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-full aspect-square rounded-xl text-white shadow-md",
        "transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
        color
      )}
      aria-label={`Open ${title}`}
    >
      <Icon className="w-7 h-7 mb-2" />
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}
