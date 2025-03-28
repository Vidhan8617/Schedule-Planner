
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  Plus, 
  Filter, 
  Book,
  Calendar,
  Check,
  Calendar as CalendarIcon
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  priority: "high" | "medium" | "low";
  completed: boolean;
  description: string;
};

// Sample data
const assignmentsData: Assignment[] = [
  {
    id: "1",
    title: "Physics Lab Report",
    course: "PHYS 201",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: "high",
    completed: false,
    description: "Complete lab report for Experiment 3: Projectile Motion",
  },
  {
    id: "2",
    title: "Literature Essay",
    course: "ENGL 305",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    priority: "medium",
    completed: false,
    description: "Write a 5-page analysis of Shakespeare's Hamlet",
  },
  {
    id: "3",
    title: "Calculus Problem Set",
    course: "MATH 101",
    dueDate: new Date(),
    priority: "high",
    completed: false,
    description: "Solve problems 1-15 in Chapter 4",
  },
  {
    id: "4",
    title: "History Reading",
    course: "HIST 210",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 4)),
    priority: "low",
    completed: true,
    description: "Read Chapter 8: The Renaissance Period",
  },
  {
    id: "5",
    title: "Programming Project",
    course: "CS 200",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    priority: "medium",
    completed: false,
    description: "Implement a linked list data structure in Java",
  },
  {
    id: "6",
    title: "Chemistry Quiz Prep",
    course: "CHEM 101",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: "high",
    completed: false,
    description: "Study for quiz on organic compounds",
  },
];

const priorityStyles = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-orange-100 text-orange-700 border-orange-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
};

const formatDueDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  date.setHours(0, 0, 0, 0);
  
  if (date.getTime() === today.getTime()) {
    return "Today";
  } else if (date.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else {
    return format(date, "MMM d");
  }
};

export function AssignmentList() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("upcoming");
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentsData);

  const handleToggleComplete = (id: string) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
  };

  // Filter assignments based on the selected tab
  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return !assignment.completed;
    if (filter === "completed") return assignment.completed;
    return true;
  });

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Assignments</CardTitle>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" /> Due Date
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Book className="h-4 w-4 mr-2" /> Course
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" /> Priority
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="bg-edu-purple hover:bg-edu-dark-purple">
            <Plus className="h-4 w-4 mr-1" /> New Assignment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="w-full" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          
          <div className="space-y-3">
            {filteredAssignments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No assignments found.
              </div>
            ) : (
              filteredAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={cn(
                    "border rounded-lg p-4 transition-all",
                    assignment.completed
                      ? "bg-muted border-muted opacity-70"
                      : "hover:border-edu-purple"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={assignment.completed}
                      onCheckedChange={() => handleToggleComplete(assignment.id)}
                      className={cn(
                        "mt-1",
                        assignment.completed && "text-edu-purple"
                      )}
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h4 className={cn(
                          "font-medium",
                          assignment.completed && "line-through text-muted-foreground"
                        )}>
                          {assignment.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="font-normal">
                            {assignment.course}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              priorityStyles[assignment.priority]
                            )}
                          >
                            {assignment.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {assignment.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                          <span>Due {formatDueDate(assignment.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
