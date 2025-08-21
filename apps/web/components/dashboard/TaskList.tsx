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
import { CheckCircle, Clock, TrendingUp, ListTodo } from "lucide-react";

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

  // Calculate statistics
  const totalTasks = tasks?.length || 0;
  const completedTasks =
    tasks?.filter((task: Task) => task.completed).length || 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoadingState count={3} />
        </div>
        <LoadingState count={1} />
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
      <div className="space-y-6">
        <div className="text-center py-12">
          <EmptyState
            title="No tasks found"
            description="Create your first task to get started with TaskFlow!"
            icon={<ListTodo className="w-12 h-12 text-muted-foreground" />}
          />
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      description: `${completedTasks} completed, ${pendingTasks} pending`,
      icon: <ListTodo className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      description: `${completedTasks} of ${totalTasks} tasks completed`,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      description: pendingTasks > 0 ? "Still in progress" : "All caught up! 🎉",
      icon: <Clock className="h-5 w-5" />,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-4">
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

      {/* Tasks Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Your Tasks
          </h2>
          <p className="text-sm text-muted-foreground">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="grid grid-auto-fit gap-6">
          {tasks.map((task: Task) => (
            <div key={task._id} className="animate-in">
              <TaskCard
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
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
