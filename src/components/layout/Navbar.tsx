
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, CheckSquare, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/hooks/use-sidebar";

export function Navbar() {
  const { toggle } = useSidebar();

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={toggle} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-edu-purple flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">EduPlanner</span>
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 p-0.5 min-w-[18px] h-[18px] bg-edu-purple text-white">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px] p-2">
            <h3 className="font-medium px-2 py-1.5">Notifications</h3>
            <div className="my-1">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-2 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <CheckSquare className="h-4 w-4 text-edu-purple" />
                  <span className="font-medium text-sm flex-1">Physics Assignment Due</span>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Complete Chapter 4 Problems due today at 11:59 PM</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-2 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <Calendar className="h-4 w-4 text-edu-purple" />
                  <span className="font-medium text-sm flex-1">Math Lecture</span>
                  <span className="text-xs text-muted-foreground">10m ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Starts in 30 minutes in Room 302</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center space-x-2 p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-edu-purple text-white">JS</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm hidden md:inline-block">Jamie Smith</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
