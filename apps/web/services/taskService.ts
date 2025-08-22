import { CreateTaskRequest, UpdateTaskRequest, Task } from "@repo/types";
import { apiClient } from "../lib/axios";

class TaskService {
  async getTasks(): Promise<Task[]> {
    try {
      const tasks = await apiClient.get<Task[]>("/api/tasks");
      return tasks;
    } catch (error: any) {
      console.error("Failed to fetch tasks:", error);
      throw error;
    }
  }

  async createTask(data: CreateTaskRequest): Promise<Task> {
    try {
      const task = await apiClient.post<Task>("/api/tasks", data);
      return task;
    } catch (error: any) {
      console.error("Failed to create task:", error);
      throw error;
    }
  }

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    try {
      const task = await apiClient.put<Task>(`/api/tasks/${id}`, data);
      return task;
    } catch (error: any) {
      console.error("Failed to update task:", error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await apiClient.delete<void>(`/api/tasks/${id}`);
    } catch (error: any) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  }

  async toggleTask(id: string): Promise<Task> {
    try {
      const task = await apiClient.patch<Task>(`/api/tasks/${id}/toggle`);
      return task;
    } catch (error: any) {
      console.error("Failed to toggle task:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();
