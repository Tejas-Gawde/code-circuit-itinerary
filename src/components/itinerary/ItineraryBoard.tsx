"use client";

import { useState, useEffect } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import type { ItineraryData, Day as DayType, Activity as ActivityType } from '@/types/itinerary';
import { initialItineraryData } from '@/data/initial-data';
import useLocalStorage from '@/hooks/useLocalStorage';
import { DayColumn } from './DayColumn';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save } from 'lucide-react';
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

    // Moving within the same day
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

    // Moving from one day to another
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
  
  // TODO: Implement Add Day functionality
  // const addDay = () => {
  //   const newDayId = `day-${Object.keys(data.days).length + 1}`;
  //   const newDay: DayType = {
  //     id: newDayId,
  //     title: `Day ${Object.keys(data.days).length + 1}`,
  //     activityIds: [],
  //     date: new Date().toLocaleDateString('en-CA'), // Example date
  //   };
  //   setData(prevData => ({
  //     ...prevData,
  //     days: {
  //       ...prevData.days,
  //       [newDayId]: newDay,
  //     },
  //     dayOrder: [...prevData.dayOrder, newDayId],
  //   }));
  //    toast({ title: "Day Added", description: `${newDay.title} has been added.` });
  // };

  // Ensure data is loaded on client before rendering DND context
  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Loading Itinerary...</p>
      </div>
    );
  }
  
  if (!data || !data.days || !data.activities) {
     // This case should ideally be handled by useLocalStorage's initial value or error handling
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-destructive">Error loading itinerary data. Please refresh.</p>
      </div>
    );
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4 md:p-6">
        {/* Placeholder for future actions like "Add Day" 
        <div className="mb-6 flex justify-end">
           <Button onClick={addDay} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Day
          </Button> 
        </div>
        */}
        <div className="flex flex-row overflow-x-auto pb-4 -mx-2">
          {data.dayOrder.map(dayId => {
            const day = data.days[dayId];
            if (!day) return null; 
            const activities = day.activityIds.map(activityId => data.activities[activityId]).filter(Boolean) as ActivityType[];
            return <DayColumn key={day.id} day={day} activities={activities} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}
