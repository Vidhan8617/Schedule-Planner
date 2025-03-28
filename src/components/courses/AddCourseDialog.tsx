
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Course code must be at least 2 characters.",
  }),
  name: z.string().min(3, {
    message: "Course name must be at least 3 characters.",
  }),
  instructor: z.string().min(3, {
    message: "Instructor name must be at least 3 characters.",
  }),
  schedule: z.string().min(3, {
    message: "Schedule must be at least 3 characters.",
  }),
  credits: z.string().transform(val => parseInt(val)),
  color: z.enum(["bg-edu-soft-blue", "bg-edu-soft-green", "bg-edu-soft-yellow", "bg-edu-soft-purple", "bg-edu-soft-pink"], {
    required_error: "Please select a color.",
  }),
});

export type Course = z.infer<typeof formSchema>;

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCourseAdded: (course: Course) => void;
}

export function AddCourseDialog({ 
  open, 
  onOpenChange,
  onCourseAdded 
}: AddCourseDialogProps) {
  const { toast } = useToast();
  
  const form = useForm<Course>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      instructor: "",
      schedule: "",
      credits: "3",
      color: "bg-edu-soft-blue",
    },
  });

  const onSubmit = (data: Course) => {
    onCourseAdded(data);
    toast({
      title: "Success",
      description: "Course has been added",
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CS 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select credits" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Credit</SelectItem>
                        <SelectItem value="2">2 Credits</SelectItem>
                        <SelectItem value="3">3 Credits</SelectItem>
                        <SelectItem value="4">4 Credits</SelectItem>
                        <SelectItem value="5">5 Credits</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Course name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructor</FormLabel>
                  <FormControl>
                    <Input placeholder="Instructor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Mon, Wed, Fri 10:00-11:30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bg-edu-soft-blue" className="bg-edu-soft-blue">Blue</SelectItem>
                      <SelectItem value="bg-edu-soft-green" className="bg-edu-soft-green">Green</SelectItem>
                      <SelectItem value="bg-edu-soft-yellow" className="bg-edu-soft-yellow">Yellow</SelectItem>
                      <SelectItem value="bg-edu-soft-purple" className="bg-edu-soft-purple">Purple</SelectItem>
                      <SelectItem value="bg-edu-soft-pink" className="bg-edu-soft-pink">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Course</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
