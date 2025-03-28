
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
};

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Physics Lab Report",
    course: "PHYS 201",
    dueDate: "Tomorrow",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Literature Essay",
    course: "ENGL 305",
    dueDate: "3 days left",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Calculus Problem Set",
    course: "MATH 101",
    dueDate: "Today",
    priority: "high",
    completed: false,
  },
  {
    id: "4",
    title: "History Reading",
    course: "HIST 210",
    dueDate: "4 days left",
    priority: "low",
    completed: true,
  },
];

const priorityStyles = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-orange-100 text-orange-700 border-orange-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
};

export function UpcomingAssignments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Upcoming Assignments</CardTitle>
        <Button variant="ghost" size="sm" className="text-edu-purple">
          View All
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {assignments
          .filter((item) => !item.completed)
          .slice(0, 3)
          .map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-3 border border-gray-100 rounded-lg hover:bg-edu-soft-gray transition-colors animate-fade-in"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded bg-edu-soft-purple flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-edu-purple" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{item.title}</h4>
                <div className="text-sm text-muted-foreground">{item.course}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant="outline"
                  className={cn("text-xs", priorityStyles[item.priority])}
                >
                  {item.priority}
                </Badge>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.dueDate}
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
