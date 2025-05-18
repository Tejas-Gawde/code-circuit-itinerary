"use client";

import type { Day, Activity } from '@/types/itinerary';
import { Droppable } from '@hello-pangea/dnd';
import { ActivityCard } from './ActivityCard';
import { ScrollArea } from "@/components/ui/scroll-area";

interface DayColumnProps {
  day: Day;
  activities: Activity[];
}

export function DayColumn({ day, activities }: DayColumnProps) {
  return (
    <div className="flex flex-col w-full md:w-80 lg:w-96 bg-secondary/50 rounded-lg shadow-md mx-2 shrink-0">
      <h3 className="text-lg font-semibold p-4 border-b text-center text-primary-foreground bg-primary rounded-t-lg">
        {day.title}
        {day.date && <span className="block text-xs font-normal text-primary-foreground/80">{day.date}</span>}
      </h3>
      <Droppable droppableId={day.id} type="ACTIVITY">
        {(provided, snapshot) => (
          <ScrollArea 
            className="flex-grow p-3 transition-colors duration-200 ease-in-out min-h-[300px]"
            style={{ backgroundColor: snapshot.isDraggingOver ? 'hsl(var(--accent) / 0.1)' : 'transparent' }}
          >
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="h-full" // Ensure div takes full height for ScrollArea
            >
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <ActivityCard key={activity.id} activity={activity} index={index} />
                ))
              ) : (
                !snapshot.isDraggingOver && (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground p-4">
                    No activities yet. Drag one here!
                  </div>
                )
              )}
              {provided.placeholder}
            </div>
          </ScrollArea>
        )}
      </Droppable>
    </div>
  );
}
