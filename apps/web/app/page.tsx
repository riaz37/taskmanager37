"use client";

import React from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@repo/ui/button";
import { ThemeToggle } from "@repo/ui/theme-toggle";
import { CheckCircle, ArrowRight, Star, Check } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  const features = [
    "Smart task organization",
    "Deadline tracking",
    "Team collaboration",
    "Progress analytics",
    "Mobile responsive",
    "Secure & private",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                <CheckCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">TaskFlow</span>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <div className="hidden sm:block w-px h-6 bg-border/50" />
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/sign-in")}
                className="hidden sm:inline-flex hover:bg-muted/50 transition-colors"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/auth/sign-up")}
                className="bg-primary hover:bg-primary/90 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Trust badge */}
            <div className="mb-8 inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm">
              <Star className="mr-2 h-4 w-4 fill-primary text-primary" />
              Trusted by 10,000+ teams
            </div>

            {/* Main headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Organize Your Work,
              <span className="block text-primary">Accomplish More</span>
            </h1>

            {/* Description */}
            <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
              The intelligent task manager that helps teams stay organized, meet
              deadlines, and achieve their goals.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => router.push("/auth/sign-up")}
                className="h-12 px-8 text-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have improved their workflow
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/auth/sign-up")}
              className="h-12 px-8 text-lg"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          <p className="text-muted-foreground">
            &copy; 2025 TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
