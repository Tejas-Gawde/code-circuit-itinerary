
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availableIcons, getDefaultIcon, type IconInfo } from '@/config/icons';
import type { Icon as LucideIcon } from 'lucide-react';

interface AddActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (details: { title: string; description: string; iconName: string }) => void;
  dayTitle: string;
}

export function AddActivityDialog({ isOpen, onClose, onAddActivity, dayTitle }: AddActivityDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIconName, setSelectedIconName] = useState<string>(getDefaultIcon().name);

  useEffect(() => {
    if (isOpen) {
      // Reset form when dialog opens
      setTitle('');
      setDescription('');
      setSelectedIconName(getDefaultIcon().name);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) {
      // Basic validation, consider using react-hook-form for more complex scenarios
      alert("Title is required."); 
      return;
    }
    onAddActivity({ title, description, iconName: selectedIconName });
    onClose(); // Close dialog after adding
  };

  const CurrentIcon = availableIcons.find(icon => icon.name === selectedIconName)?.IconComponent || getDefaultIcon().IconComponent;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Activity to {dayTitle}</DialogTitle>
          <DialogDescription>
            Fill in the details for your new activity. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <Select value={selectedIconName} onValueChange={setSelectedIconName}>
              <SelectTrigger className="col-span-3">
                <div className="flex items-center gap-2">
                  <CurrentIcon className="h-4 w-4" />
                  <SelectValue placeholder="Select an icon" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map((iconInfo: IconInfo) => (
                  <SelectItem key={iconInfo.name} value={iconInfo.name}>
                    <div className="flex items-center gap-2">
                      <iconInfo.IconComponent className="h-4 w-4" />
                      <span>{iconInfo.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Museum Visit"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Subtitle
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Optional: e.g., Explore local history"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>Add Activity</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
