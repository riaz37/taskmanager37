"use client";

import React from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CheckCircle, ArrowRight, Star, Check, Zap, Shield, Users } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Smart task organization with instant search and filtering"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates and sharing"
    }
  ];

  const benefits = [
    "Smart task organization",
    "Deadline tracking & reminders",
    "Team collaboration tools",
    "Progress analytics & insights",
    "Mobile responsive design",
    "Secure & private data"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto container-padding">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-sm">
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
                className="hidden sm:inline-flex hover:bg-muted/50 transition-colors focus-ring"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/auth/sign-up")}
                className="btn-primary focus-ring"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding-y">
          <div className="container mx-auto container-padding text-center">
            <div className="mx-auto max-w-4xl space-y-8">
              {/* Trust badge */}
              <div className="inline-flex items-center rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Star className="mr-2 h-4 w-4 fill-primary text-primary" />
                Trusted by 10,000+ productive teams
              </div>

              {/* Main headline */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  Organize Your Work,
                  <span className="block gradient-text">Accomplish More</span>
                </h1>
                
                {/* Description */}
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  The intelligent task manager that helps teams stay organized, meet
                  deadlines, and achieve their goals with beautiful, intuitive design.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() => router.push("/auth/sign-up")}
                  className="h-12 px-8 text-base font-semibold btn-primary focus-ring"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-8 text-base font-semibold border-2 hover:bg-muted/50 focus-ring"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding-y bg-muted/20">
          <div className="container mx-auto container-padding">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Why Choose TaskFlow?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Built with modern teams in mind, featuring everything you need to stay productive
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="group p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding-y">
          <div className="container mx-auto container-padding">
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Everything you need to stay organized
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    TaskFlow provides all the tools you need to manage your tasks efficiently, 
                    collaborate with your team, and track your progress.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding-y bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto container-padding">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join thousands of users who have transformed their workflow with TaskFlow. 
                  Start your free trial today, no credit card required.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => router.push("/auth/sign-up")}
                  className="h-12 px-8 text-base font-semibold btn-primary focus-ring"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/auth/sign-in")}
                  className="h-12 px-8 text-base font-semibold border-2 hover:bg-muted/50 focus-ring"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto container-padding py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <CheckCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <p className="text-muted-foreground">
              &copy; 2025 TaskFlow. All rights reserved. Built with ❤️ for productive teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
