"use client";

import React, { Suspense, lazy, useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useTasks } from "@/hooks/useTasks";
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
  const { user } = useAuth();
  const [showCreateTask, setShowCreateTask] = useState(false);
  
  const tasksHook = useTasks();
  const { tasks, loading } = tasksHook;

  // Listen for create task events from the Header
  useEffect(() => {
    const handleCreateTaskEvent = () => {
      setShowCreateTask(true);
    };

    // Add event listener for create task from header
    window.addEventListener('create-task', handleCreateTaskEvent);
    
    return () => {
      window.removeEventListener('create-task', handleCreateTaskEvent);
    };
  }, []);

  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  // Calculate statistics
  const completedTasks = tasksHook.filteredTasks?.filter(task => task.completed).length || 0;
  const pendingTasks = tasksHook.filteredTasks?.filter(task => !task.completed).length || 0;
  const totalTasks = tasksHook.filteredTasks?.length || 0;
  const overdueTasks = 0; // TODO: Implement overdue calculation
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (!user) {
    return <LoadingState />;
  }

  const statsCards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      description: "All active tasks",
      icon: <Target className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Completed",
      value: completedTasks,
      description: `${completionRate}% completion rate`,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Pending",
      value: pendingTasks,
      description: "Tasks in progress",
      icon: <Clock className="h-5 w-5" />,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      description: "Past due date",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
    },
  ];

  const quickActions = [
    {
      title: "Create Task",
      description: "Add a new task to your list",
      icon: <Plus className="h-6 w-6" />,
      action: handleCreateTask,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "View Calendar",
      description: "Check your task schedule",
      icon: <Calendar className="h-6 w-6" />,
      action: () => {},
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Team Overview",
      description: "See team progress",
      icon: <Users className="h-6 w-6" />,
      action: () => {},
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-background to-muted/30 rounded-2xl p-8 border border-border/50">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Here's what's happening with your tasks today. Stay organized and productive!
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2.5 rounded-xl ${stat.bgColor} ${stat.borderColor} border group-hover:scale-110 transition-transform duration-300`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="group cursor-pointer hover:shadow-md transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${action.bgColor} ${action.borderColor} border group-hover:scale-110 transition-transform duration-300`}>
                    <div className={action.color}>
                      {action.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Progress Overview</h2>
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Task Completion Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-lg font-semibold text-foreground">{completionRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">{totalTasks}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">{pendingTasks}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Recent Tasks</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCreateTask}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <Suspense fallback={<LoadingState />}>
              {loading ? (
                <LoadingState />
              ) : (
                <TaskList {...tasksHook} />
              )}
            </Suspense>
          </CardContent>
        </Card>
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
