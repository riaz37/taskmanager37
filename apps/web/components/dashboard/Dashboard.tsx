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
  Plus,
  TrendingUp,
  Calendar,
  Users
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
      color: "text-primary-blue",
      bgColor: "bg-primary-blue/10",
      borderColor: "border-primary-blue/20",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <Clock className="w-5 h-5" />,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-error",
      bgColor: "bg-error/10",
      borderColor: "border-error/20",
    }
  ];

  const quickActions = [
    {
      title: "Create Task",
      description: "Add a new task to your list",
      icon: <Plus className="w-5 h-5" />,
      action: handleCreateTask,
      color: "bg-gradient-primary",
    },
    {
      title: "View Calendar",
      description: "Check your schedule",
      icon: <Calendar className="w-5 h-5" />,
      action: () => {},
      color: "bg-gradient-accent",
    },
    {
      title: "Team Overview",
      description: "See team progress",
      icon: <Users className="w-5 h-5" />,
      action: () => {},
      color: "bg-gradient-blue-sky",
    },
    {
      title: "Analytics",
      description: "View performance metrics",
      icon: <TrendingUp className="w-5 h-5" />,
      action: () => {},
      color: "bg-gradient-blue-ocean",
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="spinner-blue"></div>
          <p className="text-sm text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onCreateTask={handleCreateTask}
      />
      
          {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 border border-primary/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Here's what's happening with your tasks today. You're making great progress!
              </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success font-medium">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">{totalTasks} tasks in progress</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleCreateTask} 
            size="lg"
            className="btn-blue-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="mr-2 h-5 w-5" />
              New Task
            </Button>
        </div>
          </div>

          {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
          <Card key={index} className="card-blue-primary hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.borderColor} border`}>
                <div className={stat.color}>
                    {stat.icon}
                </div>
                  </div>
                </CardHeader>
                <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              {stat.title === "Total Tasks" && completionRate > 0 && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="progress-blue flex-1">
                      <div 
                        className="progress-blue-fill" 
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{completionRate}%</span>
                  </div>
                </div>
              )}
                </CardContent>
              </Card>
            ))}
          </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <span className="text-sm text-muted-foreground">Get things done faster</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="card-blue cursor-pointer hover:scale-105 transition-all duration-300 group"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <div className="text-primary-foreground">
                    {action.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

          {/* Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Your Tasks</h2>
              <p className="text-sm text-muted-foreground">
                Manage and organize your tasks efficiently
              </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary/20 text-primary hover:bg-primary/5"
            >
              View All
            </Button>
            <Button 
              onClick={handleCreateTask}
              size="sm"
              className="btn-blue-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
            </div>

        <div className="card-blue-primary">
          <div className="p-6">
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
