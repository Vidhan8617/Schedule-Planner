
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Book, FileText, UserRound, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Course = {
  id: string;
  code: string;
  name: string;
  instructor: string;
  schedule: string;
  color: string;
  credits: number;
};

const courses: Course[] = [
  {
    id: "1",
    code: "MATH 101",
    name: "Calculus I",
    instructor: "Dr. Rodriguez",
    schedule: "Mon, Wed, Fri 10:00-11:30",
    color: "bg-edu-soft-blue",
    credits: 4,
  },
  {
    id: "2",
    code: "PHYS 201",
    name: "Physics: Mechanics",
    instructor: "Prof. Johnson",
    schedule: "Mon, Thu 13:00-15:00",
    color: "bg-edu-soft-green",
    credits: 4,
  },
  {
    id: "3",
    code: "ENGL 305",
    name: "Advanced Literature",
    instructor: "Dr. Williams",
    schedule: "Tue, Thu 15:30-16:30",
    color: "bg-edu-soft-yellow",
    credits: 3,
  },
  {
    id: "4",
    code: "CS 200",
    name: "Data Structures",
    instructor: "Prof. Smith",
    schedule: "Wed, Fri 09:00-10:30",
    color: "bg-edu-soft-purple",
    credits: 3,
  },
  {
    id: "5",
    code: "CHEM 101",
    name: "General Chemistry",
    instructor: "Dr. Lee",
    schedule: "Mon, Wed 14:00-15:30",
    color: "bg-edu-soft-pink",
    credits: 4,
  },
  {
    id: "6",
    code: "HIST 210",
    name: "World History",
    instructor: "Prof. Garcia",
    schedule: "Tue, Thu 11:00-12:30",
    color: "bg-edu-soft-blue",
    credits: 3,
  },
];

export default function Courses() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Manage your enrolled courses and materials.
          </p>
        </div>
        <Button className="bg-edu-purple hover:bg-edu-dark-purple">
          <Plus className="h-4 w-4 mr-2" /> Add Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="hover-scale">
            <CardHeader className={cn("pt-6 pb-2", course.color)}>
              <Badge variant="outline" className="w-fit mb-1 bg-white/80">
                {course.code}
              </Badge>
              <CardTitle className="text-xl">{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <UserRound className="h-4 w-4 mr-2" />
                  {course.instructor}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {course.schedule}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Book className="h-4 w-4 mr-2" />
                  {course.credits} Credits
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-6">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-1" /> Materials
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
