"use client";

import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Home, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings, 
  Users,
  FolderOpen,
  Archive,
  Star
} from "lucide-react";
import { cn } from "@/components/ui/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, current: false },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar, current: false },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, current: false },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen, current: false },
    { name: 'Team', href: '/dashboard/team', icon: Users, current: false },
    { name: 'Archive', href: '/dashboard/archive', icon: Archive, current: false },
    { name: 'Favorites', href: '/dashboard/favorites', icon: Star, current: false },
  ];

  const secondaryNavigation = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <CheckSquare className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground">TaskFlow</h1>
                <p className="text-xs text-muted-foreground">Task Manager</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="px-3 py-4 space-y-1">
              {/* Primary navigation */}
              <div className="mb-6">
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Main
                </h3>
                <div className="mt-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        item.current
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Secondary navigation */}
              <div className="mb-6">
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  System
                </h3>
                <div className="mt-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        item.current
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* User info */}
              <div className="px-3 py-4 border-t border-border">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur-sm px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-sm font-semibold leading-6 text-foreground">
            Dashboard
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
