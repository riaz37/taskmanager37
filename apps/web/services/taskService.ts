import { CreateTaskRequest, UpdateTaskRequest, Task } from "@repo/types";
import { apiClient } from "../lib/axios";

class TaskService {
  async getTasks(): Promise<Task[]> {
    return apiClient.get<Task[]>("/api/tasks");
  }

  async createTask(data: CreateTaskRequest): Promise<Task> {
    return apiClient.post<Task>("/api/tasks", data);
  }

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    return apiClient.put<Task>(`/api/tasks/${id}`, data);
  }

  async deleteTask(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/tasks/${id}`);
  }

  async toggleTask(id: string): Promise<Task> {
    return apiClient.patch<Task>(`/api/tasks/${id}/toggle`);
  }
}

export const taskService = new TaskService();
