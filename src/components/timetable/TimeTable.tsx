
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type ClassEvent = {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  location: string;
  day: number; // 0-6 (Sunday-Saturday)
  color: string;
};

const classes: ClassEvent[] = [
  {
    id: "1",
    subject: "Mathematics",
    startTime: "10:00",
    endTime: "11:30",
    location: "Room 302",
    day: 1, // Monday
    color: "bg-edu-soft-blue",
  },
  {
    id: "2",
    subject: "Physics",
    startTime: "13:00",
    endTime: "15:00",
    location: "Science Building",
    day: 1, // Monday
    color: "bg-edu-soft-green",
  },
  {
    id: "3",
    subject: "Literature",
    startTime: "15:30",
    endTime: "16:30",
    location: "Arts Center",
    day: 1, // Monday
    color: "bg-edu-soft-yellow",
  },
  {
    id: "4",
    subject: "Chemistry",
    startTime: "09:00",
    endTime: "11:00",
    location: "Lab 201",
    day: 2, // Tuesday
    color: "bg-edu-soft-pink",
  },
  {
    id: "5",
    subject: "History",
    startTime: "13:30",
    endTime: "15:00",
    location: "Room 105",
    day: 2, // Tuesday
    color: "bg-edu-soft-purple",
  },
  {
    id: "6",
    subject: "Programming",
    startTime: "09:30",
    endTime: "11:30",
    location: "Computer Lab",
    day: 3, // Wednesday
    color: "bg-edu-soft-blue",
  },
  {
    id: "7",
    subject: "Statistics",
    startTime: "14:00",
    endTime: "15:30",
    location: "Room 302",
    day: 4, // Thursday
    color: "bg-edu-soft-green",
  },
  {
    id: "8",
    subject: "Economics",
    startTime: "10:30",
    endTime: "12:00",
    location: "Room 401",
    day: 5, // Friday
    color: "bg-edu-soft-yellow",
  },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export function TimeTable() {
  const [currentWeek, setCurrentWeek] = React.useState(0);

  // Function to calculate class position in the timetable grid
  const getClassPosition = (startTime: string, endTime: string) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const endHour = parseInt(endTime.split(":")[0]);
    const endMinute = parseInt(endTime.split(":")[1]);
    
    // Calculate start row position (each hour is 60px, each minute is 1px)
    const startPosition = (startHour - 8) * 60 + startMinute;
    
    // Calculate height of the event (in pixels)
    const durationMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
    
    return {
      top: `${startPosition}px`,
      height: `${durationMinutes}px`,
    };
  };

  return (
    <Card className="col-span-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Weekly Schedule</h3>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">Week {currentWeek === 0 ? "Current" : currentWeek > 0 ? `+${currentWeek}` : currentWeek}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentWeek(currentWeek + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-edu-purple hover:bg-edu-dark-purple ml-2">
              <Plus className="h-4 w-4 mr-1" /> Add Class
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="w-full min-w-[800px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 border-b">
              <div className="p-2 text-center font-medium text-sm text-muted-foreground">
                Time
              </div>
              {daysOfWeek.filter((_, index) => index > 0).map((day, index) => (
                <div 
                  key={day} 
                  className={cn(
                    "p-2 text-center font-medium",
                    new Date().getDay() === index + 1 && currentWeek === 0 ? "bg-edu-soft-purple text-edu-purple rounded-t-md" : ""
                  )}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Timetable grid */}
            <div className="relative grid grid-cols-8 h-[720px]">
              {/* Time labels */}
              <div className="col-span-1 border-r">
                {timeSlots.map((time) => (
                  <div key={time} className="h-[60px] text-xs text-center pt-1 border-b relative">
                    <span className="absolute -top-3 left-0 right-0">{time}</span>
                  </div>
                ))}
              </div>
              
              {/* Day columns */}
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div 
                  key={day} 
                  className={cn(
                    "col-span-1 border-r relative",
                    new Date().getDay() === day && currentWeek === 0 ? "bg-edu-soft-gray" : ""
                  )}
                >
                  {/* Render hour grid lines */}
                  {timeSlots.map((time) => (
                    <div key={time} className="h-[60px] border-b"></div>
                  ))}
                  
                  {/* Render classes for this day */}
                  {classes
                    .filter((classItem) => classItem.day === day)
                    .map((classItem) => {
                      const position = getClassPosition(classItem.startTime, classItem.endTime);
                      
                      return (
                        <div
                          key={classItem.id}
                          className={cn(
                            "absolute inset-x-1 rounded-md p-2 hover:brightness-95 transition-all cursor-pointer animate-scale-in",
                            classItem.color
                          )}
                          style={{
                            top: position.top,
                            height: position.height,
                          }}
                        >
                          <div className="font-medium text-sm truncate">{classItem.subject}</div>
                          <div className="text-xs opacity-80 truncate">{classItem.location}</div>
                          <div className="text-xs mt-1">
                            {classItem.startTime} - {classItem.endTime}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
