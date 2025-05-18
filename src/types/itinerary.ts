
import type { Icon as LucideIcon } from 'lucide-react'; // Renamed to avoid conflict if Icon is used as a component name

export interface Activity {
  id: string;
  content: string;
  icon?: LucideIcon; 
  description?: string; 
}

export interface Day {
  id: string;
  title: string;
  date?: string; 
  activityIds: string[];
}

export interface ItineraryData {
  activities: {
    [key: string]: Activity;
  };
  days: {
    [key: string]: Day;
  };
  dayOrder: string[]; 
}
