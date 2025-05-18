
"use client";

import type { Activity } from '@/types/itinerary';
import { Draggable } from '@hello-pangea/dnd';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';
import { iconMap, getDefaultIcon } from '@/config/icons';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onDelete: (activityId: string) => void;
}

export function ActivityCard({ activity, index, onDelete }: ActivityCardProps) {
  const IconComponent = (activity.iconName && iconMap[activity.iconName]) 
                        || getDefaultIcon().IconComponent;

  return (
    <Draggable draggableId={activity.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-2" 
        >
          <Card
            className={`transition-shadow duration-200 ease-in-out ${
              snapshot.isDragging ? 'shadow-xl scale-105 border-primary ring-2 ring-primary' : 'shadow-md hover:shadow-lg'
            } bg-card`}
          >
            <CardHeader className="flex flex-row items-start justify-between p-3 space-y-0">
              <div className="flex items-center gap-2 flex-grow">
                {IconComponent && <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />}
                <div className="flex-grow">
                  <CardTitle className="text-base font-medium leading-none">{activity.content}</CardTitle>
                   {activity.description && (
                    <CardDescription className="text-xs mt-1">{activity.description}</CardDescription>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center ml-2">
                <div {...provided.dragHandleProps} className="cursor-grab p-1 text-muted-foreground hover:text-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 mt-1 text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(activity.id)}
                  aria-label="Delete activity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {/* Description moved up under CardTitle for better layout with delete button */}
          </Card>
        </div>
      )}
    </Draggable>
  );
}
