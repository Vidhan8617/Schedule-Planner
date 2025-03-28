
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellRing, Plus, Calendar, CheckSquare, Trash2, Book } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Reminder = {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "assignment" | "class" | "exam" | "other";
  enabled: boolean;
};

const remindersData: Reminder[] = [
  {
    id: "1",
    title: "Physics Lab Report Due",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "11:59 PM",
    type: "assignment",
    enabled: true,
  },
  {
    id: "2",
    title: "Mathematics Lecture",
    date: new Date(),
    time: "10:00 AM",
    type: "class",
    enabled: true,
  },
  {
    id: "3",
    title: "Literature Midterm Exam",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    time: "2:00 PM",
    type: "exam",
    enabled: true,
  },
  {
    id: "4",
    title: "Group Study Session",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "4:00 PM",
    type: "other",
    enabled: false,
  },
  {
    id: "5",
    title: "Chemistry Quiz",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "9:30 AM",
    type: "exam",
    enabled: true,
  },
];

const typeIcons = {
  assignment: <CheckSquare className="h-5 w-5" />,
  class: <Book className="h-5 w-5" />,
  exam: <Calendar className="h-5 w-5" />,
  other: <Bell className="h-5 w-5" />,
};

const typeColors = {
  assignment: "bg-edu-soft-blue",
  class: "bg-edu-soft-green",
  exam: "bg-edu-soft-yellow",
  other: "bg-edu-soft-gray",
};

const formatDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dateToCompare = new Date(date);
  dateToCompare.setHours(0, 0, 0, 0);
  
  if (dateToCompare.getTime() === today.getTime()) {
    return "Today";
  } else if (dateToCompare.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }
};

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(remindersData);

  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((reminder) => {
        if (reminder.id === id) {
          const updated = { ...reminder, enabled: !reminder.enabled };
          
          // Show toast
          toast({
            title: updated.enabled ? "Reminder enabled" : "Reminder disabled",
            description: updated.title,
          });
          
          return updated;
        }
        return reminder;
      })
    );
  };

  const handleDeleteReminder = (id: string) => {
    const reminderToDelete = reminders.find((r) => r.id === id);
    
    if (reminderToDelete) {
      setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
      
      toast({
        title: "Reminder deleted",
        description: reminderToDelete.title,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
          <p className="text-muted-foreground">
            Manage notifications for classes, assignments, and exams.
          </p>
        </div>
        <Button className="bg-edu-purple hover:bg-edu-dark-purple">
          <Plus className="h-4 w-4 mr-2" /> Add Reminder
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Active Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No reminders found.
              </div>
            ) : (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={cn(
                    "flex items-center p-4 border rounded-lg",
                    reminder.enabled ? "border-edu-purple" : "border-muted opacity-70"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                    typeColors[reminder.type]
                  )}>
                    {typeIcons[reminder.type]}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{reminder.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatDate(reminder.date)} at {reminder.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => handleToggleReminder(reminder.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Assignment Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications before assignments are due
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Class Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Get alerts 30 minutes before classes start
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Exam Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about upcoming exams
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive important reminders via email
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
