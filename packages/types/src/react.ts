import { ReactNode } from "react";
import type { UserData, Task } from "./index";

// React context types
export interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setLoadingMessage: (message: string) => void;
}

export interface LoadingProviderProps {
  children: ReactNode;
}

// Hook return types
export interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterStatus: "all" | "completed" | "pending";
  sortBy: "createdAt" | "updatedAt" | "title";
  sortOrder: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: "all" | "completed" | "pending") => void;
  setSortBy: (field: "createdAt" | "updatedAt" | "title") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  createTask: (data: import("./index").CreateTaskRequest) => Promise<void>;
  updateTask: (
    id: string,
    data: import("./index").UpdateTaskRequest,
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
  clearError: () => void;
}

export interface UseAuthReturn {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  clearError: () => void;
}

// Component prop types
export interface TaskPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export interface TaskFiltersProps {
  searchTerm: string;
  filterStatus: "all" | "completed" | "pending";
  sortBy: "createdAt" | "updatedAt" | "title";
  sortOrder: "asc" | "desc";
  onSearchChange: (term: string) => void;
  onFilterChange: (status: "all" | "completed" | "pending") => void;
  onSortByChange: (field: "createdAt" | "updatedAt" | "title") => void;
  onSortOrderChange: (order: "asc" | "desc") => void;
}

export interface TaskCardProps {
  task: Task;
  onToggle: (task: Task) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
  className?: string;
}

export interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

export interface HeaderProps {
  user: UserData;
  onLogout: () => Promise<void>;
  onCreateTask: () => void;
  title?: string;
  className?: string;
}

export interface DashboardLayoutProps {
  user: UserData;
  onLogout: () => Promise<void>;
  onCreateTask: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
