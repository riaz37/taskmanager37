'use client';

import React, { Suspense, lazy, useState } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import Header from './Header';
import LoadingState from '@repo/ui/LoadingState';

// Lazy load components
const TaskList = lazy(() => import('./TaskList'));
const CreateTaskDialog = lazy(() => import('./CreateTaskDialog'));

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showCreateTask, setShowCreateTask] = useState(false);

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
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onLogout={handleLogout}
        onCreateTask={handleCreateTask}
      />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Here's an overview of your tasks.
            </p>
          </div>
          
          <Suspense fallback={<LoadingState count={3} />}>
            <TaskList />
          </Suspense>
        </div>

        <Suspense fallback={<LoadingState count={1} />}>
          <CreateTaskDialog
            open={showCreateTask}
            onOpenChange={setShowCreateTask}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard; 