
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Home, 
  Bell, 
  Settings,
  ChevronLeft
} from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const primaryNavItems: NavItem[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/timetable",
    label: "Timetable",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    href: "/assignments",
    label: "Assignments",
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    href: "/reminders",
    label: "Reminders",
    icon: <Bell className="h-5 w-5" />,
  },
];

const secondaryNavItems: NavItem[] = [
  {
    href: "/settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const { open, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 overflow-y-auto",
        open ? "w-64 min-w-64" : "w-0 min-w-0"
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-end mb-4">
          <Button variant="ghost" size="icon" onClick={toggle} className="hidden md:flex">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-2 flex-1">
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-edu-soft-purple text-edu-purple"
                    : "text-muted-foreground hover:bg-edu-soft-gray hover:text-foreground"
                )
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <Separator className="my-4" />

        <nav className="space-y-2">
          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-edu-soft-purple text-edu-purple"
                    : "text-muted-foreground hover:bg-edu-soft-gray hover:text-foreground"
                )
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4">
          <div className="bg-edu-soft-purple rounded-lg p-4">
            <h4 className="font-medium text-edu-purple mb-2">Study Tip</h4>
            <p className="text-xs text-muted-foreground">
              Try the Pomodoro technique: Study for 25 minutes, then take a 5-minute break to improve focus and retention.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
