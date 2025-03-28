
import React from "react";
import { UpcomingClasses } from "@/components/dashboard/UpcomingClasses";
import { UpcomingAssignments } from "@/components/dashboard/UpcomingAssignments";
import { StudyStats } from "@/components/dashboard/StudyStats";
import { QuickLinks } from "@/components/dashboard/QuickLinks";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your academic schedule.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingClasses />
        <UpcomingAssignments />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StudyStats />
        <QuickLinks />
      </div>
    </div>
  );
}
