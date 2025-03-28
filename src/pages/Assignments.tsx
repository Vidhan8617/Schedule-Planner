
import React from "react";
import { AssignmentList } from "@/components/assignments/AssignmentList";

export default function Assignments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          Track and manage your assignments and due dates.
        </p>
      </div>

      <div className="grid gap-6">
        <AssignmentList />
      </div>
    </div>
  );
}
