
import React, { useState } from "react";
import { AssignmentList } from "@/components/assignments/AssignmentList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddAssignmentDialog, Assignment } from "@/components/assignments/AddAssignmentDialog";

export default function Assignments() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const handleAssignmentAdded = (assignment: Assignment) => {
    setAssignments([...assignments, assignment]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">
            Track and manage your assignments and due dates.
          </p>
        </div>
        <Button 
          className="bg-edu-purple hover:bg-edu-dark-purple self-start"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Assignment
        </Button>
      </div>

      <div className="grid gap-6">
        <AssignmentList />
      </div>

      <AddAssignmentDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAssignmentAdded={handleAssignmentAdded}
      />
    </div>
  );
}
