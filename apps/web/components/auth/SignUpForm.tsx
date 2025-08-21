"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/contexts/auth-context";
import { toast } from "sonner";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import Link from "next/link";
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Loader2, 
  UserPlus, 
  Sparkles,
  User,
  Mail,
  Lock,
  Shield,
  Zap,
  CheckCircle,
  Gift,
  Users,
  Clock
} from "lucide-react";

const SignUpForm: React.FC = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      await register(data.name, data.email, data.password);
      toast.success("Welcome to TaskFlow!", {
        description: "Your account has been created successfully.",
        icon: <UserPlus className="h-4 w-4" />,
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed", {
        description: "Please check your information and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: <Gift className="w-4 h-4" />, text: "14-day free trial included" },
    { icon: <Users className="w-4 h-4" />, text: "Collaborate with unlimited team members" },
    { icon: <Clock className="w-4 h-4" />, text: "Set up in under 2 minutes" },
  ];

  const features = [
    "Unlimited personal tasks",
    "Team collaboration tools",
    "Advanced analytics & insights",
    "Mobile apps for iOS & Android",
    "24/7 customer support",
    "Enterprise-grade security"
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-primary-hover"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">TaskFlow</h1>
                <p className="text-white/80 text-sm">Modern Productivity</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Start your productivity journey today
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of teams who trust TaskFlow to organize their work and achieve their goals.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 text-white/90 animate-in slide-in-from-left-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm">
                  {benefit.icon}
                </div>
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4">Everything you need to get started:</h3>
            <div className="grid grid-cols-1 gap-2">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 text-white/80 animate-in slide-in-from-left-4"
                  style={{ animationDelay: `${(index + 3) * 50}ms` }}
                >
                  <CheckCircle className="w-4 h-4 text-white/60" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold">TaskFlow</span>
            </div>
            <p className="text-muted-foreground">Create your account</p>
          </div>

          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          {/* Form Card */}
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader className="space-y-2 pb-6 pt-8 px-8">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    Get started with TaskFlow in just a few steps
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="hidden sm:flex">
                  <Gift className="w-3 h-3 mr-1" />
                  Free Trial
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-foreground flex items-center">
                            <User className="w-4 h-4 mr-2 text-muted-foreground" />
                            Full name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your full name"
                              className="h-12 px-4 text-base transition-all duration-200 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 rounded-xl"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-foreground flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                            Email address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="h-12 px-4 text-base transition-all duration-200 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 rounded-xl"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-foreground flex items-center">
                            <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="h-12 px-4 pr-12 text-base transition-all duration-200 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 rounded-xl"
                                disabled={isLoading}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                                tabIndex={-1}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-foreground flex items-center">
                            <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                            Confirm password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="h-12 px-4 pr-12 text-base transition-all duration-200 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 rounded-xl"
                                disabled={isLoading}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                disabled={isLoading}
                                tabIndex={-1}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold btn-primary shadow-lg hover:shadow-xl transition-all duration-200 interactive-scale"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <UserPlus className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-3 text-muted-foreground font-medium">
                        Already have an account?
                      </span>
                    </div>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already using TaskFlow?{" "}
                      <Link
                        href="/auth/sign-in"
                        className="font-semibold text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline"
                      >
                        Sign in to your account
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>Instant Setup</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:text-primary-hover transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary-hover transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
