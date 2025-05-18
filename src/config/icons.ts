
import type { Icon as LucideIcon } from 'lucide-react';
import { 
  Coffee, Users, Utensils, Briefcase, MapPin, Landmark, ShoppingBag, Sun, Plane, 
  BedDouble, Train, Palette, Package, Car, Camera, Star, Heart, Home, Settings, Anchor, MountainSnow, Sailboat, Bike
} from 'lucide-react';

export interface IconInfo {
  name: string;
  IconComponent: LucideIcon;
}

export const availableIcons: IconInfo[] = [
  { name: 'Coffee', IconComponent: Coffee },
  { name: 'Users', IconComponent: Users },
  { name: 'Utensils', IconComponent: Utensils },
  { name: 'Briefcase', IconComponent: Briefcase },
  { name: 'MapPin', IconComponent: MapPin },
  { name: 'Landmark', IconComponent: Landmark },
  { name: 'ShoppingBag', IconComponent: ShoppingBag },
  { name: 'Sun', IconComponent: Sun },
  { name: 'Plane', IconComponent: Plane },
  { name: 'BedDouble', IconComponent: BedDouble },
  { name: 'Train', IconComponent: Train },
  { name: 'Palette', IconComponent: Palette },
  { name: 'Package', IconComponent: Package },
  { name: 'Car', IconComponent: Car },
  { name: 'Camera', IconComponent: Camera },
  { name: 'Star', IconComponent: Star },
  { name: 'Heart', IconComponent: Heart },
  { name: 'Home', IconComponent: Home },
  { name: 'Settings', IconComponent: Settings },
  { name: 'Anchor', IconComponent: Anchor },
  { name: 'MountainSnow', IconComponent: MountainSnow },
  { name: 'Sailboat', IconComponent: Sailboat },
  { name: 'Bike', IconComponent: Bike },
];

export const iconMap: { [key: string]: LucideIcon } = availableIcons.reduce((acc, curr) => {
  acc[curr.name] = curr.IconComponent;
  return acc;
}, {} as { [key: string]: LucideIcon });

export const getDefaultIcon = (): IconInfo => availableIcons[0] || { name: 'Package', IconComponent: Package };
