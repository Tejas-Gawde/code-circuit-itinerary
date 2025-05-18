
"use client";

import { useState } from 'react';
import type { Day, Activity } from '@/types/itinerary';
import { Droppable } from '@hello-pangea/dnd';
import { ActivityCard } from './ActivityCard';
import { AddActivityDialog } from './AddActivityDialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DayColumnProps {
  day: Day;
  activities: Activity[];
  onAddActivity: (dayId: string, activityDetails: { title: string; description: string; iconName: string }) => void;
  onDeleteActivity: (activityId: string, dayId: string) => void;
  onDeleteDay: (dayId: string) => void;
}

export function DayColumn({ day, activities, onAddActivity, onDeleteActivity, onDeleteDay }: DayColumnProps) {
  const [isAddActivityDialogOpen, setIsAddActivityDialogOpen] = useState(false);

  const handleAddActivity = (activityDetails: { title: string; description: string; iconName: string }) => {
    onAddActivity(day.id, activityDetails);
    setIsAddActivityDialogOpen(false);
  };

  const handleDeleteActivityFromColumn = (activityId: string) => {
    onDeleteActivity(activityId, day.id);
  };

  return (
    <div className="flex flex-col w-full md:w-80 lg:w-96 bg-secondary/50 rounded-lg shadow-md shrink-0" style={{ height: 'calc(100vh - 180px)' }}>
      <div className="flex items-center justify-between p-4 border-b bg-primary rounded-t-lg text-primary-foreground">
        <div className="text-center flex-grow">
          <h3 className="text-lg font-semibold">
            {day.title}
          </h3>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="h-8 w-8 ">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete "{day.title}" and all its activities. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteDay(day.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete Day
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Droppable droppableId={day.id} type="ACTIVITY">
        {(provided, snapshot) => (
          <ScrollArea
            className="flex-grow p-3 transition-colors duration-200 ease-in-out scrollbar-hide"
            style={{ backgroundColor: snapshot.isDraggingOver ? 'hsl(var(--accent) / 0.1)' : 'transparent' }}
          >
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-[200px]"
            >
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    index={index}
                    onDelete={handleDeleteActivityFromColumn}
                  />
                ))
              ) : (
                !snapshot.isDraggingOver && (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground p-4 min-h-[100px]">
                    No activities yet. Drag one here or add a new one!
                  </div>
                )
              )}
              {provided.placeholder}
            </div>
          </ScrollArea>
        )}
      </Droppable>

      <div className="p-3 mt-auto border-t border-border">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsAddActivityDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Activity
        </Button>
      </div>

      <AddActivityDialog
        isOpen={isAddActivityDialogOpen}
        onClose={() => setIsAddActivityDialogOpen(false)}
        onAddActivity={handleAddActivity}
        dayTitle={day.title}
      />
    </div>
  );
}
