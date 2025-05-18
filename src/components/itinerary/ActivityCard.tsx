
"use client";

import type { Activity } from '@/types/itinerary';
import { Draggable } from '@hello-pangea/dnd';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

export function ActivityCard({ activity, index }: ActivityCardProps) {
  const IconComponent = activity.icon; // Assign to an uppercase variable

  return (
    <Draggable draggableId={activity.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-2" // Add margin bottom for spacing between cards
        >
          <Card
            className={`transition-shadow duration-200 ease-in-out ${
              snapshot.isDragging ? 'shadow-xl scale-105 border-primary ring-2 ring-primary' : 'shadow-md hover:shadow-lg'
            } bg-card`}
          >
            <CardHeader className="flex flex-row items-center justify-between p-3 space-y-0">
              <div className="flex items-center gap-2">
                {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
                <CardTitle className="text-base font-medium leading-none">{activity.content}</CardTitle>
              </div>
              <div {...provided.dragHandleProps} className="cursor-grab p-1 text-muted-foreground hover:text-foreground">
                <GripVertical className="h-5 w-5" />
              </div>
            </CardHeader>
            {activity.description && (
              <CardContent className="p-3 pt-0">
                <CardDescription className="text-xs">{activity.description}</CardDescription>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  );
}
