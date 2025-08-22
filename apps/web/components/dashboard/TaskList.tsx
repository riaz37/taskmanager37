"use client";

import React, { useState, useEffect } from "react";
import { Task } from "@repo/types";
import { UseTasksReturn } from "@repo/types/src/react";
import TaskCard from "./TaskCard";
import TaskFilters from "./TaskFilters";
import TaskPagination from "./TaskPagination";
import EditTaskDialog from "./EditTaskDialog";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, Filter, SortAsc } from "lucide-react";

interface TaskListProps extends UseTasksReturn {}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  deleteTask,
  updateTask,
  toggleTask,
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
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      await toggleTask(task._id);
    } catch (error) {
      console.error("Failed to toggle task status:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditSave = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask._id, updatedTask);
      setEditingTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingState count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <EmptyState
          title="No tasks found"
          description="Create your first task to get started with TaskFlow!"
          icon={<ListTodo className="w-12 h-12 text-muted-foreground" />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters & Search</span>
        </div>
        <TaskFilters
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
        />
      </div>

      {/* Tasks Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ListTodo className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Your Tasks
            </h3>
            <p className="text-sm text-muted-foreground">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <SortAsc className="h-4 w-4" />
          <span>
            Sorted by {sortBy === 'createdAt' ? 'Date Created' : 
                       sortBy === 'updatedAt' ? 'Last Updated' : 'Title'} 
            ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
          </span>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task: Task) => (
          <div key={task._id} className="animate-in slide-in-from-bottom-2 duration-300">
            <TaskCard
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <TaskPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      )}

      {/* Edit Dialog */}
      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          open={!!editingTask}
          onOpenChange={() => setEditingTask(null)}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default TaskList;
