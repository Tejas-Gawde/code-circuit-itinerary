
"use client";

import { useState } from 'react';
import type { Day, Activity } from '@/types/itinerary';
import { Droppable } from '@hello-pangea/dnd';
import { ActivityCard } from './ActivityCard';
import { AddActivityDialog } from './AddActivityDialog';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface DayColumnProps {
  day: Day;
  activities: Activity[];
  onAddActivity: (dayId: string, activityDetails: { title: string; description: string; iconName: string }) => void;
}

export function DayColumn({ day, activities, onAddActivity }: DayColumnProps) {
  const [isAddActivityDialogOpen, setIsAddActivityDialogOpen] = useState(false);

  const handleAddActivity = (activityDetails: { title: string; description: string; iconName: string }) => {
    onAddActivity(day.id, activityDetails);
    setIsAddActivityDialogOpen(false); // Close dialog after submission
  };

  return (
    <div className="flex flex-col w-full md:w-80 lg:w-96 bg-secondary/50 rounded-lg shadow-md mx-2 shrink-0" style={{ height: 'calc(100vh - 180px)' /* Approximate height based on header/footer */ }}>
      <h3 className="text-lg font-semibold p-4 border-b text-center text-primary-foreground bg-primary rounded-t-lg">
        {day.title}
        {day.date && <span className="block text-xs font-normal text-primary-foreground/80">{day.date}</span>}
      </h3>
      
      <Droppable droppableId={day.id} type="ACTIVITY">
        {(provided, snapshot) => (
          <ScrollArea 
            className="flex-grow p-3 transition-colors duration-200 ease-in-out" // Removed min-h-[300px] to allow flex-grow to work with parent height
            style={{ backgroundColor: snapshot.isDraggingOver ? 'hsl(var(--accent) / 0.1)' : 'transparent' }}
          >
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-[200px]" // Ensure droppable area has some min height
            >
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <ActivityCard key={activity.id} activity={activity} index={index} />
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
