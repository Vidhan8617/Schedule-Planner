
import React from "react";
import { TimeTable } from "@/components/timetable/TimeTable";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Timetable() {
  const { toast } = useToast();

  const handleReset = () => {
    // We'll reload the page to reset the timetable
    window.location.reload();
    
    toast({
      title: "Timetable Reset",
      description: "Your timetable has been reset to default values",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
          <p className="text-muted-foreground">
            Manage your weekly class schedule and study sessions.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="self-start"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Reset Timetable
        </Button>
      </div>

      <div className="grid gap-6">
        <TimeTable />
      </div>
    </div>
  );
}
