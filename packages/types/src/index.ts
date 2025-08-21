// Core domain types
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// User data returned from server (without password)
export interface UserData {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API request/response types
export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  name: string;
}

export interface AuthResponse {
  user: UserData;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Database model interfaces (for backend)
export interface IUser extends Omit<User, "_id"> {
  _id: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ITask extends Omit<Task, "_id" | "userId"> {
  _id: string;
  userId: string;
}

// Export React types
export * from './react';
