import { CreateTaskRequest, UpdateTaskRequest, Task } from "@repo/types";
import { apiClient } from "../lib/axios";

class TaskService {
  async getTasks(): Promise<Task[]> {
    return apiClient.get<Task[]>("/tasks");
  }

  async createTask(data: CreateTaskRequest): Promise<Task> {
    return apiClient.post<Task>("/tasks", data);
  }

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    return apiClient.put<Task>(`/tasks/${id}`, data);
  }

  async deleteTask(id: string): Promise<void> {
    return apiClient.delete<void>(`/tasks/${id}`);
  }

  async toggleTask(id: string): Promise<Task> {
    return apiClient.patch<Task>(`/tasks/${id}/toggle`);
  }
}

export const taskService = new TaskService();
