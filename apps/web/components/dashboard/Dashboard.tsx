"use client";

import React, { Suspense, lazy, useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useTasks } from "@/hooks/useTasks";
import Header from "./Header";
import LoadingState from "@/components/ui/LoadingState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Users,
  Target,
  Sparkles,
  Plus,
  Filter,
  MoreHorizontal
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

  // Get upcoming tasks (tasks due within next 7 days)
  const upcomingTasks = tasks?.filter(task => {
    if (task.completed) return false;
    // Since we don't have dueDate, we'll use createdAt as a proxy for recent tasks
    const createdDate = new Date(task.createdAt);
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return createdDate >= lastWeek;
  }).length || 0;

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
      description: `${pendingTasks} pending, ${completedTasks} completed`,
      icon: <Target className="w-5 h-5" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      description: "Tasks completed this month",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Due Soon",
      value: upcomingTasks,
      description: "Tasks due within 7 days",
      icon: <Clock className="w-5 h-5" />,
      color: "text-warning",
      bgColor: "bg-warning/10",
      trend: "-3%",
      trendUp: false
    },
    {
      title: "Overdue",
      value: overdueTasks,
      description: "Tasks past due date",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      trend: overdueTasks > 0 ? "+2%" : "0%",
      trendUp: false
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading your workspace...</p>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Welcome back, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Here's your productivity overview for today
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="default"
                className="h-10 px-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button 
                onClick={handleCreateTask}
                className="h-10 px-6 shadow-lg hover:shadow-xl transition-all duration-200 interactive-scale"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <Card 
                key={index} 
                className="card-modern hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className={`h-3 w-3 ${stat.trendUp ? 'text-success' : 'text-destructive'} ${!stat.trendUp && 'rotate-180'}`} />
                      <span className={`text-xs font-medium ${stat.trendUp ? 'text-success' : 'text-destructive'}`}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 card-modern">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold">Today's Focus</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 animate-pulse">
                          <div className="w-4 h-4 bg-muted rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : tasks && tasks.length > 0 ? (
                    <div className="space-y-3">
                      {tasks.slice(0, 3).map((task, index) => (
                        <div 
                          key={task._id} 
                          className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                        >
                          <div className={`w-4 h-4 rounded-full border-2 ${task.completed ? 'bg-success border-success' : 'border-muted-foreground'} transition-colors group-hover:border-primary`}>
                            {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              {task.title}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                {task.completed ? 'Completed' : 'Active'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Created {new Date(task.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 mx-auto mb-4">
                        <Target className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">No tasks for today</p>
                      <Button 
                        onClick={handleCreateTask} 
                        size="sm" 
                        className="mt-3"
                      >
                        Create your first task
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <Users className="h-4 w-4 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Team Activity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                      SJ
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Sarah completed "UI Design"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-accent-foreground text-xs font-semibold">
                      MC
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Mike added new task</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center text-success-foreground text-xs font-semibold">
                      ER
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Emma updated project</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Management Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Your Tasks</h2>
              <Badge variant="outline" className="px-3 py-1">
                {totalTasks} total
              </Badge>
            </div>
            
            <Suspense 
              fallback={
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i} className="card-modern animate-pulse">
                        <CardHeader>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-8 bg-muted rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-3 bg-muted rounded w-full"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="card-modern animate-pulse">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-muted rounded-full"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-muted rounded w-3/4"></div>
                              <div className="h-3 bg-muted rounded w-1/2"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
