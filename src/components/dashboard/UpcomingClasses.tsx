
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ClassItem = {
  id: string;
  subject: string;
  time: string;
  location: string;
  duration: string;
  color: string;
};

const upcomingClasses: ClassItem[] = [
  {
    id: "1",
    subject: "Mathematics",
    time: "10:00 AM",
    location: "Room 302",
    duration: "1h 30m",
    color: "bg-edu-soft-blue",
  },
  {
    id: "2",
    subject: "Physics",
    time: "1:00 PM",
    location: "Science Building",
    duration: "2h",
    color: "bg-edu-soft-green",
  },
  {
    id: "3",
    subject: "Literature",
    time: "3:30 PM",
    location: "Arts Center",
    duration: "1h",
    color: "bg-edu-soft-yellow",
  },
];

export function UpcomingClasses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Today's Classes</CardTitle>
        <Button variant="ghost" size="sm" className="text-edu-purple">
          View All
        </Button>
      </CardHeader>
      <CardContent className="grid gap-3">
        {upcomingClasses.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex p-3 rounded-lg space-x-3 animate-fade-in",
              item.color
            )}
          >
            <div className="flex flex-col justify-center items-center min-w-[60px] text-center p-2 bg-white rounded">
              <span className="text-xs text-muted-foreground">Today</span>
              <span className="text-lg font-semibold">{item.time}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{item.subject}</h4>
              <div className="flex flex-col md:flex-row md:gap-3 gap-1 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {item.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
