"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Check, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  BarChart3,
  Sparkles,
  ChevronDown,
  Play,
  Award,
  Target,
  Lightbulb
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
          <p className="text-sm text-muted-foreground animate-pulse">Loading TaskFlow...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Smart task organization with instant search, filtering, and AI-powered suggestions for maximum productivity",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is encrypted end-to-end with enterprise-grade security and zero-knowledge architecture",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates, shared workspaces, and intelligent task delegation",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "Get insights into your productivity patterns with detailed analytics and performance tracking",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Management",
      description: "Built-in time tracking, deadline management, and smart scheduling to optimize your workflow",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal Tracking",
      description: "Set and track goals with milestone management and progress visualization for better outcomes",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    }
  ];

  const benefits = [
    "Smart task organization with AI assistance",
    "Deadline tracking & intelligent reminders",
    "Real-time team collaboration tools",
    "Advanced progress analytics & insights",
    "Cross-platform mobile responsive design",
    "Enterprise-grade security & privacy",
    "Customizable workflows & templates",
    "Integration with popular tools & services"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "TaskFlow transformed our team's productivity. The intuitive design and powerful features make project management effortless.",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Startup Founder",
      company: "InnovateAI",
      content: "The best task management tool I've ever used. Clean interface, powerful features, and excellent team collaboration.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Design Lead",
      company: "CreativeStudio",
      content: "Finally, a task manager that's both beautiful and functional. Our team's efficiency has increased by 40%.",
      avatar: "ER"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "1M+", label: "Tasks Completed" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full glass-header">
        <div className="container-modern">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary-hover to-accent shadow-lg ring-1 ring-primary/20">
                <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">TaskFlow</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Modern Productivity</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </nav>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <div className="hidden sm:block w-px h-6 bg-border/50" />
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/sign-in")}
                className="hidden sm:inline-flex hover:bg-muted/50 transition-all duration-200 focus-modern"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/auth/sign-up")}
                className="btn-primary focus-modern shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Enhanced */}
        <section className="section-padding-y-lg relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="container-modern relative z-10">
            <div className="mx-auto max-w-5xl text-center space-y-8">
              {/* Trust Badge */}
              <div className="animate-in slide-in-from-top-4 duration-1000">
                <Badge variant="secondary" className="inline-flex items-center rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-2 text-sm font-medium shadow-sm">
                  <Award className="mr-2 h-4 w-4 text-primary" />
                  Trusted by 50,000+ productive teams worldwide
                </Badge>
              </div>

              {/* Main Headline */}
              <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-1000 delay-200">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl text-balance">
                  Transform Your Workflow,
                  <span className="block gradient-text bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift">
                    Achieve More
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                  The intelligent task management platform that adapts to your workflow. 
                  Streamline collaboration, track progress, and accomplish your goals with 
                  beautiful, intuitive design powered by AI.
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in slide-in-from-bottom-8 duration-1000 delay-400">
                <Button
                  size="lg"
                  onClick={() => router.push("/auth/sign-up")}
                  className="h-14 px-8 text-base font-semibold btn-primary focus-modern shadow-xl hover:shadow-2xl interactive-scale"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-8 text-base font-semibold border-2 glass-button hover:bg-card/80 focus-modern interactive-scale"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-in slide-in-from-bottom-10 duration-1000 delay-600">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section id="features" className="section-padding-y bg-surface/30">
          <div className="container-modern">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-16 animate-in slide-in-from-bottom-6">
                <Badge variant="outline" className="mb-4">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Powerful Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
                  Everything you need to stay productive
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                  Built with modern teams in mind, featuring everything you need to organize, 
                  collaborate, and achieve your goals efficiently.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="group card-modern p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in slide-in-from-bottom-8"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Enhanced */}
        <section className="section-padding-y">
          <div className="container-modern">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 animate-in slide-in-from-left-8">
                  <div>
                    <Badge variant="outline" className="mb-4">
                      <Target className="mr-2 h-4 w-4" />
                      Why Choose TaskFlow
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-balance">
                      Designed for modern productivity
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                      TaskFlow combines powerful functionality with intuitive design to create 
                      the ultimate productivity experience. From individual tasks to complex 
                      project management, we've got you covered.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-in slide-in-from-left-6"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-foreground font-medium text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Visual Element */}
                <div className="relative animate-in slide-in-from-right-8">
                  <div className="relative glass-card p-8 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-primary/20 rounded-full w-24"></div>
                        <div className="h-3 bg-accent/20 rounded-full w-16"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <div className="h-8 bg-primary/20 rounded-full w-20"></div>
                        <div className="h-8 bg-success/20 rounded-full w-16"></div>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section-padding-y bg-surface/30">
          <div className="container-modern">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-16 animate-in slide-in-from-bottom-6">
                <Badge variant="outline" className="mb-4">
                  <Users className="mr-2 h-4 w-4" />
                  Customer Stories
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Loved by teams worldwide
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See how TaskFlow is helping teams achieve more and work smarter
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-8"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="section-padding-y bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-modern relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-8 animate-in slide-in-from-bottom-6">
              <div className="space-y-6">
                <Badge variant="outline" className="mb-4">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ready to Get Started?
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Join thousands of productive teams
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
                  Transform your workflow today with TaskFlow. Start your free trial now, 
                  no credit card required. Experience the future of task management.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => router.push("/auth/sign-up")}
                  className="h-14 px-8 text-base font-semibold btn-primary focus-modern shadow-xl hover:shadow-2xl interactive-scale"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/auth/sign-in")}
                  className="h-14 px-8 text-base font-semibold border-2 glass-button hover:bg-card/80 focus-modern interactive-scale"
                >
                  Sign In to Your Account
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-success" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-success" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-border/40 bg-surface/50 backdrop-blur-sm">
        <div className="container-modern py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">TaskFlow</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Modern task management designed for productive teams. 
                Transform your workflow and achieve more.
              </p>
              <div className="flex space-x-4">
                <ThemeToggle />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#integrations" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#security" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#help" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#api" className="hover:text-foreground transition-colors">API Docs</a></li>
                <li><a href="#status" className="hover:text-foreground transition-colors">System Status</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#blog" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#careers" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 TaskFlow. All rights reserved. Built with ❤️ for productive teams worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
