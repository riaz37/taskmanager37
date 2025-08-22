"use client";

import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import Header from "@/components/dashboard/Header";
import { useAuth as useAuthContext } from "@/lib/contexts/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { logout } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingState showCards={false} />;
  }

  if (!user) {
    return <LoadingState showCards={false} />;
  }

  const handleLogout = async () => {
    logout();
    router.push("/auth/sign-in");
  };

  const handleCreateTask = () => {
    // This will be handled by the Dashboard component
    // You can implement navigation or state management here if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onCreateTask={handleCreateTask}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
