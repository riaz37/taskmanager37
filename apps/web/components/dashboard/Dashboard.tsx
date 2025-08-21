"use client";

import React, { Suspense, lazy, useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useTasks } from "@/hooks/useTasks";
import Header from "./Header";
import LoadingState from "@/components/ui/LoadingState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Target,
  Plus
} from "lucide-react";

// Lazy load components
const TaskList = lazy(() => import("./TaskList"));
const CreateTaskDialog = lazy(() => import("./CreateTaskDialog"));

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showCreateTask, setShowCreateTask] = useState(false);
  
  // Use the tasks hook at the Dashboard level
  const tasksHook = useTasks();
  const { tasks, loading } = tasksHook;

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

  // Calculate statistics
  const completedTasks = tasks?.filter(task => task.completed).length || 0;
  const pendingTasks = tasks?.filter(task => !task.completed).length || 0;
  const totalTasks = tasks?.length || 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get overdue tasks (using a simple heuristic based on creation time)
  const overdueTasks = tasks?.filter(task => {
    if (task.completed) return false;
    // Consider tasks created more than 14 days ago as potentially overdue
    const createdDate = new Date(task.createdAt);
    const today = new Date();
    const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
    return createdDate < twoWeeksAgo;
  }).length || 0;

  const statsCards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <Target className="w-5 h-5" />,
      color: "text-primary",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <Clock className="w-5 h-5" />,
      color: "text-orange-600",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-red-600",
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading your workspace...</p>
        </div>
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
      
      <main className="flex-1 overflow-hidden">
        <div className="container-modern py-8 space-y-8 h-full">
          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome back, {user.name.split(' ')[0]}
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your tasks today.
              </p>
            </div>
            <Button onClick={handleCreateTask} className="w-fit">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tasks Section */}
          <div className="flex-1 min-h-0">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
              <p className="text-sm text-muted-foreground">
                Manage and organize your tasks efficiently
              </p>
            </div>

            <div className="h-full">
              <Suspense fallback={<LoadingState />}>
                {loading ? (
                  <LoadingState />
                ) : (
                  <TaskList {...tasksHook} />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      {/* Create Task Dialog */}
      <Suspense fallback={null}>
        <CreateTaskDialog
          open={showCreateTask}
          onOpenChange={setShowCreateTask}
          createTask={tasksHook.createTask}
        />
      </Suspense>
    </div>
  );
};

export default Dashboard;
