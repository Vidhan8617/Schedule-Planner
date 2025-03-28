
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckSquare, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type QuickLink = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  href: string;
};

const quickLinks: QuickLink[] = [
  {
    id: "1",
    label: "Add Class",
    icon: <Calendar className="h-5 w-5" />,
    color: "bg-edu-soft-blue",
    href: "/timetable",
  },
  {
    id: "2",
    label: "New Assignment",
    icon: <CheckSquare className="h-5 w-5" />,
    color: "bg-edu-soft-green",
    href: "/assignments",
  },
  {
    id: "3",
    label: "Add Course",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-edu-soft-yellow",
    href: "/courses",
  },
];

export function QuickLinks() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Button
            key={link.id}
            variant="outline"
            size="lg"
            className={cn(
              "h-auto w-full py-6 px-4 flex flex-col items-center justify-center gap-3 border-2 hover-scale",
              link.color
            )}
            asChild
          >
            <Link to={link.href}>
              <div className="bg-white p-2 rounded-full">
                {link.icon}
              </div>
              <span className="font-medium">{link.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
