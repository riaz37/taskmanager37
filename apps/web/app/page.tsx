"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  CheckCircle, 
  ArrowRight, 
  Users, 
  BarChart3,
  Sparkles
} from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading TaskFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Clean Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container-modern">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-tight">TaskFlow</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Modern Productivity</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </nav>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <div className="hidden sm:block w-px h-6 bg-border/50" />
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/sign-in")}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/auth/sign-up")}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Minimal & Clean */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Modern Task Management
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Simple, powerful, and beautiful. Organize your work and achieve more with TaskFlow.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => router.push("/auth/sign-up")}
                className="h-12 px-8"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push("/auth/sign-in")}
                className="h-12 px-8"
              >
                Sign In
              </Button>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 border-t border-border/50 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-semibold">50K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">1M+</div>
                <div className="text-sm text-muted-foreground">Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Simplified */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container-modern">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-semibold mb-4">
                  Everything you need
                </h2>
                <p className="text-lg text-muted-foreground">
                  Powerful features designed for modern teams
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Task Management</h3>
                  <p className="text-muted-foreground text-sm">
                    Create, organize, and track your tasks with ease
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Team Collaboration</h3>
                  <p className="text-muted-foreground text-sm">
                    Work together seamlessly with your team
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Progress Tracking</h3>
                  <p className="text-muted-foreground text-sm">
                    Monitor progress and stay on top of deadlines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Simple */}
        <section className="py-24">
          <div className="container-modern">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-semibold">
                Ready to get started?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of teams already using TaskFlow to stay productive.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/auth/sign-up")}
                className="h-12 px-8"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
