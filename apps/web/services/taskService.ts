import { CreateTaskRequest, UpdateTaskRequest, Task } from "@repo/types";
import { apiClient } from "../lib/axios";

class TaskService {
  async getTasks(): Promise<Task[]> {
    try {
      console.log("📋 Fetching tasks...");
      const tasks = await apiClient.get<Task[]>("/api/tasks");
      console.log("✅ Tasks fetched successfully:", tasks.length, "tasks");
      return tasks;
    } catch (error: any) {
      console.error("❌ Failed to fetch tasks:", error);
      throw error;
    }
  }

  async createTask(data: CreateTaskRequest): Promise<Task> {
    try {
      console.log("➕ Creating task:", data.title);
      const task = await apiClient.post<Task>("/api/tasks", data);
      console.log("✅ Task created successfully:", task.title);
      return task;
    } catch (error: any) {
      console.error("❌ Failed to create task:", error);
      throw error;
    }
  }

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    try {
      console.log("✏️ Updating task:", id, data);
      const task = await apiClient.put<Task>(`/api/tasks/${id}`, data);
      console.log("✅ Task updated successfully:", task.title);
      return task;
    } catch (error: any) {
      console.error("❌ Failed to update task:", error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      console.log("🗑️ Deleting task:", id);
      await apiClient.delete<void>(`/api/tasks/${id}`);
      console.log("✅ Task deleted successfully");
    } catch (error: any) {
      console.error("❌ Failed to delete task:", error);
      throw error;
    }
  }

  async toggleTask(id: string): Promise<Task> {
    try {
      console.log("🔄 Toggling task:", id);
      const task = await apiClient.patch<Task>(`/api/tasks/${id}/toggle`);
      console.log("✅ Task toggled successfully:", task.title, "completed:", task.completed);
      return task;
    } catch (error: any) {
      console.error("❌ Failed to toggle task:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();
