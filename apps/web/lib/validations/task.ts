import { z } from "zod";

// Create task validation schema
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .min(1, "Task title must be at least 1 character")
    .max(100, "Task title cannot exceed 100 characters")
    .trim(),
  description: z
    .string()
    .max(500, "Task description cannot exceed 500 characters")
    .optional(),
});

// Update task validation schema
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .min(1, "Task title must be at least 1 character")
    .max(100, "Task title cannot exceed 100 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .max(500, "Task description cannot exceed 500 characters")
    .optional(),
  completed: z.boolean().optional(),
});

// Task filter schema
export const taskFilterSchema = z.object({
  status: z.enum(["all", "completed", "pending"]).default("all"),
  search: z.string().optional(),
  sortBy: z.enum(["createdAt", "title", "completed"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Type inference from schemas
export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
export type TaskFilterData = z.infer<typeof taskFilterSchema>;
