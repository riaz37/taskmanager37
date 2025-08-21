import { useState, useEffect, useCallback, useMemo } from "react";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "@repo/types";
import { UseTasksReturn } from "@repo/types/react";
import { taskService } from "@/services/taskService";

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "pending"
  >("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt" | "title">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Memoized filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((task) =>
        filterStatus === "completed" ? task.completed : !task.completed
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case "updatedAt":
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;

        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tasks, searchTerm, filterStatus, sortBy, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, sortBy, sortOrder]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const tasks = await taskService.getTasks();
      setTasks(tasks);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch tasks";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (data: CreateTaskRequest) => {
    try {
      setError(null);

      const newTask = await taskService.createTask(data);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create task";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const updateTask = useCallback(
    async (id: string, data: UpdateTaskRequest) => {
      try {
        setError(null);

        const updatedTask = await taskService.updateTask(id, data);
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? updatedTask : task))
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update task";
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const deleteTask = useCallback(async (id: string) => {
    try {
      setError(null);

      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete task";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    try {
      setError(null);

      const toggledTask = await taskService.toggleTask(id);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? toggledTask : task))
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to toggle task";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const refreshTasks = useCallback(async () => {
    await fetchTasks();
  }, [fetchTasks]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    searchTerm,
    filterStatus,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    totalPages,
    setSearchTerm,
    setFilterStatus,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    setItemsPerPage,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    refreshTasks,
    clearError,
  };
};
