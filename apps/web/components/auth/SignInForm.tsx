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
import { loginSchema, type LoginFormData } from "@/lib/validations";
import Link from "next/link";
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle, 
  Sparkles,
  Mail,
  Lock,
  Shield,
  Zap
} from "lucide-react";

const SignInForm: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!", {
        description: "You've successfully signed in to TaskFlow.",
        icon: <CheckCircle className="h-4 w-4" />,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Sign in failed", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: <Zap className="w-4 h-4" />, text: "Lightning-fast task management" },
    { icon: <Shield className="w-4 h-4" />, text: "Enterprise-grade security" },
    { icon: <Sparkles className="w-4 h-4" />, text: "AI-powered productivity insights" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-accent"></div>
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
              Welcome back to your productivity hub
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Continue your journey towards better task management and enhanced productivity.
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

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-white/80 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">1M+</div>
              <div className="text-white/80 text-sm">Tasks Done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-white/80 text-sm">Uptime</div>
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
            <p className="text-muted-foreground">Sign in to your account</p>
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
                  <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    Sign in to your TaskFlow account to continue
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="hidden sm:flex">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
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
                          <FormLabel className="text-sm font-semibold text-foreground flex items-center justify-between">
                            <span className="flex items-center">
                              <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                              Password
                            </span>
                            <Link 
                              href="/auth/forgot-password" 
                              className="text-xs text-primary hover:text-primary-hover transition-colors"
                            >
                              Forgot password?
                            </Link>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
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
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <CheckCircle className="ml-2 h-4 w-4" />
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
                        New to TaskFlow?
                      </span>
                    </div>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link
                        href="/auth/sign-up"
                        className="font-semibold text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline"
                      >
                        Create your account
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
                    <span>SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>99.9% Uptime</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
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

export default SignInForm;
