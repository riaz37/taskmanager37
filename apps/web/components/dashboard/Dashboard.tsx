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
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogout={handleLogout}
        onCreateTask={handleCreateTask}
      />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingState count={3} />}>
          <TaskList />
        </Suspense>

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