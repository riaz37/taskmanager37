"use client";

import React, { Suspense, lazy, useState } from "react";
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
  Plus
} from "lucide-react";

// Lazy load components
const TaskList = lazy(() => import("./TaskList"));
const CreateTaskDialog = lazy(() => import("./CreateTaskDialog"));

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showCreateTask, setShowCreateTask] = useState(false);
  
  const tasksHook = useTasks();
  const { tasks, loading } = tasksHook;

  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  // Calculate statistics
  const completedTasks = tasks?.filter(task => task.completed).length || 0;
  const pendingTasks = tasks?.filter(task => !task.completed).length || 0;
  const totalTasks = tasks?.length || 0;

  if (!user) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <Button onClick={handleCreateTask} className="btn-blue-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-2xl font-bold mt-1">{totalTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm text-muted-foreground">Done</span>
            </div>
            <div className="text-2xl font-bold mt-1">{completedTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-warning" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <div className="text-2xl font-bold mt-1">{pendingTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="text-sm text-muted-foreground">Overdue</span>
            </div>
            <div className="text-2xl font-bold mt-1">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Tasks</h2>
          <Button variant="outline" size="sm" onClick={handleCreateTask}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
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
