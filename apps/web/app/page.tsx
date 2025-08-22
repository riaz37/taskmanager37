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
  CheckSquare,
  Menu,
  X,
  Star,
  Zap,
  Shield
} from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="spinner-blue"></div>
          <p className="text-sm text-muted-foreground">Loading TaskFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Modern Header with Better Spacing */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
                <CheckSquare className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  TaskFlow
                </span>
                <span className="text-sm text-muted-foreground hidden sm:block font-medium">
                  Modern Productivity Platform
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <a 
                href="#features" 
                className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105"
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105"
              >
                Pricing
              </a>
              <a 
                href="#about" 
                className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105"
              >
                Contact
              </a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-border/50" />
              
              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/sign-in")}
                  className="h-10 px-6 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/auth/sign-up")}
                  className="btn-blue-primary h-10 px-6 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#features" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#about" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                
                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/auth/sign-in")}
                    className="h-10 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => router.push("/auth/sign-up")}
                    className="btn-blue-primary h-10 font-medium shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section - Enhanced */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            {/* Main Headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                <span>Trusted by 50K+ users worldwide</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Modern Task
                </span>
                <br />
                <span className="text-foreground">Management</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Simple, powerful, and beautiful. Organize your work and achieve more with TaskFlow's intuitive platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                onClick={() => router.push("/auth/sign-up")}
                className="btn-blue-primary h-14 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push("/auth/sign-in")}
                className="h-14 px-10 text-lg font-medium border-2 hover:border-primary hover:text-primary transition-all duration-200"
              >
                Sign In
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 border-t border-border/50 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground font-medium">Active Users</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground font-medium">Tasks Completed</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground font-medium">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section id="features" className="py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="h-4 w-4" />
                  <span>Powerful Features</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Everything you need to{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    stay productive
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Powerful features designed for modern teams and individuals
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-6 p-8 rounded-2xl hover:bg-card/50 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Task Management</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Create, organize, and track your tasks with intuitive tools designed for maximum productivity
                  </p>
                </div>
                
                <div className="text-center space-y-6 p-8 rounded-2xl hover:bg-card/50 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-accent/20">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Team Collaboration</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Work together seamlessly with real-time updates, shared workspaces, and powerful team features
                  </p>
                </div>
                
                <div className="text-center space-y-6 p-8 rounded-2xl hover:bg-card/50 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-success/10 to-warning/10 rounded-2xl flex items-center justify-center mx-auto border border-success/20">
                    <BarChart3 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Progress Tracking</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Monitor progress, set milestones, and stay on top of deadlines with comprehensive analytics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  get started?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of teams already using TaskFlow to stay productive and organized.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/auth/sign-up")}
                className="btn-blue-primary h-14 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push("/auth/sign-in")}
                className="h-14 px-10 text-lg font-medium border-2 hover:border-primary hover:text-primary transition-all duration-200"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
