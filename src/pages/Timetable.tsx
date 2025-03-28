
import React from "react";
import { TimeTable } from "@/components/timetable/TimeTable";

export default function Timetable() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
        <p className="text-muted-foreground">
          Manage your weekly class schedule and study sessions.
        </p>
      </div>

      <div className="grid gap-6">
        <TimeTable />
      </div>
    </div>
  );
}
