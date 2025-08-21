'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { Textarea } from '@repo/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@repo/ui/dialog';
import { useTasks } from '@/hooks/useTasks';
import { CreateTaskRequest } from '@repo/types';
import { CreateTaskDialogProps } from '@repo/types/src/react';
import { toast } from 'sonner';
import { Plus, Loader2 } from 'lucide-react';
import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ open, onOpenChange }) => {
  const { createTask } = useTasks();
  
  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      await createTask(data as CreateTaskRequest);
      toast.success('Task created successfully!');
      form.reset();
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create task';
      toast.error(message);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Plus className="h-4 w-4 text-primary-foreground" />
            </div>
            <DialogTitle className="text-xl">Create New Task</DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground">
            Add a new task to your task list. Fill in the details below to get started.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-medium">
              Task Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter task title"
              {...form.register('title')}
              className={`h-11 transition-all duration-200 ${
                form.formState.errors.title ? 'border-destructive focus:border-destructive' : ''
              }`}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive flex items-center">
                <span className="mr-1">⚠</span>
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter task description (optional)"
              {...form.register('description')}
              rows={4}
              className={`transition-all duration-200 resize-none ${
                form.formState.errors.description ? 'border-destructive focus:border-destructive' : ''
              }`}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive flex items-center">
                <span className="mr-1">⚠</span>
                {form.formState.errors.description.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {form.watch('description')?.length || 0}/500 characters
            </p>
          </div>

          <DialogFooter className="gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="h-10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              className="h-10"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog; 