"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task, UpdateTaskRequest } from "@repo/types";
import { EditTaskDialogProps } from "@repo/types/src/react";
import { toast } from "sonner";
import { Edit, Loader2, Save, X } from "lucide-react";
import { z } from "zod";

const editTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

type EditTaskFormData = z.infer<typeof editTaskSchema>;

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  task,
  open,
  onOpenChange,
  onSave,
  onCancel,
}) => {
  const form = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
    },
  });

  // Update form values when task changes
  React.useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || "",
      });
    }
  }, [task, form]);

  const onSubmit = async (data: EditTaskFormData) => {
    if (!task) return;

    try {
      const updatedTask: Task = {
        ...task,
        title: data.title,
        description: data.description || "",
        updatedAt: new Date(),
      };

      await onSave(updatedTask);
      toast.success("Task updated successfully!");
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update task";
      toast.error(message);
    }
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 border-border/50 bg-card/95 backdrop-blur-sm">
        {/* Header */}
        <DialogHeader className="px-6 py-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-semibold text-foreground">
                  Edit Task
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Update your task details
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenChange(false)}
              className="h-8 w-8 p-0 rounded-lg hover:bg-muted/50 focus-ring"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-6 space-y-6">
          {/* Task Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Task Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter task title"
              {...form.register("title")}
              className={`h-11 transition-all duration-200 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 text-sm rounded-lg ${
                form.formState.errors.title
                  ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                  : ""
              }`}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive flex items-center">
                <span className="mr-1.5">⚠</span>
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </Label>
            <div className="space-y-2">
              <Textarea
                id="description"
                placeholder="Enter task description (optional)"
                {...form.register("description")}
                rows={4}
                className={`transition-all duration-200 resize-none border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 text-sm rounded-lg ${
                  form.formState.errors.description
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : ""
                }`}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {form.watch("description")?.length || 0}/500 characters
                </p>
                {form.formState.errors.description && (
                  <p className="text-sm text-destructive flex items-center">
                    <span className="mr-1.5">⚠</span>
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="gap-3 pt-4 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-10 px-6 font-medium focus-ring"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-10 px-6 font-medium bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white focus-ring"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Task
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
