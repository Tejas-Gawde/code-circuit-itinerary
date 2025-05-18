
"use client";

import { useState, useEffect } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import type { ItineraryData, Day as DayType, Activity as ActivityType } from '@/types/itinerary';
import { initialItineraryData } from '@/data/initial-data';
import useLocalStorage from '@/hooks/useLocalStorage';
import { DayColumn } from './DayColumn';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ITINERARY_STORAGE_KEY = 'itineraryFlowData';

export function ItineraryBoard() {
  const [data, setData] = useLocalStorage<ItineraryData>(ITINERARY_STORAGE_KEY, initialItineraryData);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startDay = data.days[source.droppableId];
    const finishDay = data.days[destination.droppableId];

    if (!startDay || !finishDay) return;

    if (startDay === finishDay) {
      const newActivityIds = Array.from(startDay.activityIds);
      newActivityIds.splice(source.index, 1);
      newActivityIds.splice(destination.index, 0, draggableId);

      const newDay = {
        ...startDay,
        activityIds: newActivityIds,
      };

      setData(prevData => ({
        ...prevData,
        days: {
          ...prevData.days,
          [newDay.id]: newDay,
        },
      }));
      return;
    }

    const startDayActivityIds = Array.from(startDay.activityIds);
    startDayActivityIds.splice(source.index, 1);
    const newStartDay = {
      ...startDay,
      activityIds: startDayActivityIds,
    };

    const finishDayActivityIds = Array.from(finishDay.activityIds);
    finishDayActivityIds.splice(destination.index, 0, draggableId);
    const newFinishDay = {
      ...finishDay,
      activityIds: finishDayActivityIds,
    };

    setData(prevData => ({
      ...prevData,
      days: {
        ...prevData.days,
        [newStartDay.id]: newStartDay,
        [newFinishDay.id]: newFinishDay,
      },
    }));
  };
  
  const handleAddActivityToDay = (
    dayId: string, 
    activityDetails: { title: string; description: string; iconName: string }
  ) => {
    setData(prevData => {
      if (!prevData || !prevData.days || !prevData.activities) return prevData;

      const day = prevData.days[dayId];
      if (!day) return prevData;

      const newActivityId = `activity-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      
      const newActivity: ActivityType = {
        id: newActivityId,
        content: activityDetails.title,
        description: activityDetails.description,
        iconName: activityDetails.iconName,
      };

      const updatedActivities = {
        ...prevData.activities,
        [newActivityId]: newActivity,
      };

      const updatedDay = {
        ...day,
        activityIds: [...day.activityIds, newActivityId],
      };

      const updatedDays = {
        ...prevData.days,
        [dayId]: updatedDay,
      };
      
      toast({
        title: "Activity Added",
        description: `"${newActivity.content}" added to ${day.title}.`,
      });

      return {
        ...prevData,
        activities: updatedActivities,
        days: updatedDays,
      };
    });
  };

  const addDay = () => {
    setData(prevData => {
      if (!prevData || !prevData.days || !prevData.dayOrder) {
        console.error("Cannot add day: itinerary data is not properly initialized.");
        toast({
          title: "Error",
          description: "Could not add day. Itinerary data missing.",
          variant: "destructive",
        });
        return prevData;
      }
  
      const newDayNumber = Object.keys(prevData.days).length + 1;
      const newDayId = `day-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
      const newDay: DayType = {
        id: newDayId,
        title: `Day ${newDayNumber}`,
        activityIds: [],
        date: new Date().toLocaleDateString('en-CA', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        }),
      };
  
      const updatedDays = {
        ...prevData.days,
        [newDayId]: newDay,
      };
  
      const updatedDayOrder = [...prevData.dayOrder, newDayId];
      
      toast({ 
        title: "Day Added", 
        description: `${newDay.title} has been added.` 
      });
  
      return {
        ...prevData,
        days: updatedDays,
        dayOrder: updatedDayOrder,
      };
    });
  };

  const handleDeleteActivity = (activityId: string, dayId: string) => {
    setData(prevData => {
      if (!prevData || !prevData.activities || !prevData.days || !prevData.days[dayId]) return prevData;

      const activityToDelete = prevData.activities[activityId];
      const dayToUpdate = prevData.days[dayId];

      // Create new activities object without the deleted activity
      const newActivities = { ...prevData.activities };
      delete newActivities[activityId];

      // Create new day object with updated activityIds
      const newDay = {
        ...dayToUpdate,
        activityIds: dayToUpdate.activityIds.filter(id => id !== activityId),
      };

      // Create new days object with the updated day
      const newDays = {
        ...prevData.days,
        [dayId]: newDay,
      };
      
      toast({
        title: "Activity Deleted",
        description: `"${activityToDelete?.content || 'Activity'}" removed from ${dayToUpdate.title}.`,
        variant: "default", 
      });

      return {
        ...prevData,
        activities: newActivities,
        days: newDays,
      };
    });
  };

  const handleDeleteDay = (dayId: string) => {
    setData(prevData => {
      if (!prevData || !prevData.days || !prevData.activities || !prevData.dayOrder) return prevData;

      const dayToDelete = prevData.days[dayId];
      if (!dayToDelete) return prevData;

      // Get activity IDs of the day to be deleted
      const activityIdsToDelete = dayToDelete.activityIds;

      // Create new activities object excluding activities from the deleted day
      const newActivities = { ...prevData.activities };
      activityIdsToDelete.forEach(activityId => {
        delete newActivities[activityId];
      });

      // Create new days object excluding the deleted day
      const newDays = { ...prevData.days };
      delete newDays[dayId];

      // Create new dayOrder array excluding the deleted day's ID
      const newDayOrder = prevData.dayOrder.filter(id => id !== dayId);

      toast({
        title: "Day Deleted",
        description: `"${dayToDelete.title}" and all its activities have been removed.`,
        variant: "destructive",
      });

      return {
        ...prevData,
        activities: newActivities,
        days: newDays,
        dayOrder: newDayOrder,
      };
    });
  };


  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Loading Itinerary...</p>
      </div>
    );
  }
  
  if (!data || !data.days || !data.activities || !data.dayOrder) {
     return (
       <div className="flex flex-col justify-center items-center h-screen p-4 text-center">
         <p className="text-lg text-destructive mb-2">Error loading itinerary data.</p>
         <p className="text-sm text-muted-foreground">
           Your saved itinerary might be corrupted. Try clearing your browser&apos;s local storage for this site and refresh.
         </p>
       </div>
     );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4 md:p-6">
        <div className="mb-6 flex justify-end">
           <Button onClick={addDay} variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Day
          </Button> 
        </div>
        <div className="flex flex-row overflow-x-auto pb-4 -mx-2">
          {data.dayOrder.map(dayId => {
            const day = data.days[dayId];
            if (!day) {
              console.warn(`Day with id ${dayId} not found in data.days. Skipping render.`);
              return null; 
            }
            const activities = day.activityIds.map(activityId => {
              const activity = data.activities[activityId];
              if (!activity) {
                console.warn(`Activity with id ${activityId} not found for day ${dayId}.`);
              }
              return activity;
            }).filter(Boolean) as ActivityType[];
            
            return (
              <DayColumn 
                key={day.id} 
                day={day} 
                activities={activities} 
                onAddActivity={handleAddActivityToDay}
                onDeleteActivity={handleDeleteActivity}
                onDeleteDay={handleDeleteDay}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}
