import type { ItineraryData } from '@/types/itinerary';
import { Coffee, Users, Utensils, Briefcase, MapPin, Landmark, ShoppingBag, Sun, Plane, BedDouble, Train, Palette } from 'lucide-react';

export const initialItineraryData: ItineraryData = {
  activities: {
    'activity-1': { id: 'activity-1', content: 'Morning Coffee & Planning', icon: Coffee, description: 'Grab a coffee and plan the day ahead.' },
    'activity-2': { id: 'activity-2', content: 'Visit Eiffel Tower', icon: Landmark, description: 'Iconic landmark visit with photo opportunities.' },
    'activity-3': { id: 'activity-3', content: 'Lunch at Le Petit Bistro', icon: Utensils, description: 'Enjoy traditional French cuisine.' },
    'activity-4': { id: 'activity-4', content: 'Louvre Museum Tour', icon: Palette, description: 'Explore world-famous art collections.' },
    'activity-5': { id: 'activity-5', content: 'Seine River Cruise', icon: Plane, description: 'Relaxing evening cruise on the Seine. (Using Plane as placeholder for Boat)' }, // Plane icon as placeholder
    'activity-6': { id: 'activity-6', content: 'Check into Hotel', icon: BedDouble, description: 'Settle in and freshen up.' },
    'activity-7': { id: 'activity-7', content: 'Explore Montmartre', icon: MapPin, description: 'Wander through the charming streets of Montmartre.' },
    'activity-8': { id: 'activity-8', content: 'Shopping on Champs-Élysées', icon: ShoppingBag, description: 'Indulge in some retail therapy.' },
    'activity-9': { id: 'activity-9', content: 'Breakfast at hotel', icon: Coffee, description: 'Start the day with a hearty breakfast.' },
    'activity-10': { id: 'activity-10', content: 'Day trip to Versailles', icon: Train, description: 'Visit the magnificent Palace of Versailles.' },
    'activity-11': { id: 'activity-11', content: 'Relax by the beach', icon: Sun, description: 'Enjoy sunbathing and swimming.' },
    'activity-12': { id: 'activity-12', content: 'Team Building Workshop', icon: Users, description: 'Participate in team activities.'},
    'activity-13': { id: 'activity-13', content: 'Client Presentation', icon: Briefcase, description: 'Deliver key presentation to clients.'}
  },
  days: {
    'day-1': {
      id: 'day-1',
      title: 'Day 1: Arrival & Icons',
      date: '2024-08-15',
      activityIds: ['activity-6', 'activity-1', 'activity-2', 'activity-3'],
    },
    'day-2': {
      id: 'day-2',
      title: 'Day 2: Art & Charm',
      date: '2024-08-16',
      activityIds: ['activity-9', 'activity-4', 'activity-7', 'activity-5'],
    },
    'day-3': {
      id: 'day-3',
      title: 'Day 3: Shopping & Departure Prep',
      date: '2024-08-17',
      activityIds: ['activity-8', 'activity-10'],
    },
  },
  dayOrder: ['day-1', 'day-2', 'day-3'],
};
