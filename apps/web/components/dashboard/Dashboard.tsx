"use client";

import React, { Suspense, lazy, useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useTasks } from "@/hooks/useTasks";
import Header from "./Header";
import LoadingState from "@/components/ui/LoadingState";

// Lazy load components
const TaskList = lazy(() => import("./TaskList"));
const CreateTaskDialog = lazy(() => import("./CreateTaskDialog"));

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showCreateTask, setShowCreateTask] = useState(false);
  
  // Use the tasks hook at the Dashboard level
  const tasksHook = useTasks();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        user={user}
        onLogout={handleLogout}
        onCreateTask={handleCreateTask}
      />
      
      <main className="flex-1 container mx-auto container-padding py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Here's an overview of your tasks and productivity insights.
              </p>
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="space-y-6">
          <Suspense 
            fallback={
              <div className="space-y-6">
                <LoadingState count={3} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <LoadingState count={6} />
                </div>
              </div>
            }
          >
            <TaskList {...tasksHook} />
          </Suspense>
        </div>

        {/* Create Task Dialog */}
        <Suspense fallback={<LoadingState count={1} />}>
          <CreateTaskDialog
            open={showCreateTask}
            onOpenChange={setShowCreateTask}
            createTask={tasksHook.createTask}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;
