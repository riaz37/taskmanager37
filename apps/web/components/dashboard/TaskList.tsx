'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '@repo/types';
import { useTasks } from '@/hooks/useTasks';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import TaskPagination from './TaskPagination';
import EditTaskDialog from './EditTaskDialog';
import LoadingState from '@repo/ui/LoadingState';
import EmptyState from '@repo/ui/EmptyState';
import ErrorState from '@repo/ui/ErrorState';

const TaskList: React.FC = () => {
  const { 
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
    setItemsPerPage
  } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      await toggleTask(task._id);
    } catch (error) {
      console.error('Failed to toggle task status:', error);
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
      console.error('Failed to update task:', error);
    }
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  if (loading) {
    return <LoadingState count={3} />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!tasks || tasks.length === 0) {
    return <EmptyState 
      title="No tasks found" 
      description="Create your first task to get started!" 
    />;
  }

  return (
    <div className="space-y-6">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <TaskPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

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