import type { LucideIcon } from 'lucide-react';

export interface Activity {
  id: string;
  content: string;
  icon?: LucideIcon; // Using LucideIcon type for icons
  description?: string; // Optional description for more details
}

export interface Day {
  id: string;
  title: string;
  date?: string; // Optional date string for the day
  activityIds: string[];
}

export interface ItineraryData {
  activities: {
    [key: string]: Activity;
  };
  days: {
    [key: string]: Day;
  };
  dayOrder: string[]; // Array of day IDs to maintain order
}
