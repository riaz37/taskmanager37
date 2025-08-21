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
import { useAuth } from "@/lib/contexts/auth-context";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import Link from "next/link";
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckSquare,
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
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <CheckSquare className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-success to-success-light rounded-full flex items-center justify-center">
                <Shield className="h-3 w-3 text-success-foreground" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome back! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to your TaskFlow account and continue where you left off
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <Card className="card-blue-primary border-0 shadow-2xl">
          <CardHeader className="space-y-2 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Sign In
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          disabled={isLoading}
                          className="input-blue h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            disabled={isLoading}
                            className="input-blue h-12 text-base pr-12"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="btn-blue-primary w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <p className="text-base text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                href="/auth/sign-up" 
                className="font-semibold text-primary hover:text-primary-light transition-colors duration-200 hover:underline"
              >
                Sign up for free
              </Link>
            </p>
            
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to home
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground">Fast</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center mx-auto">
                <CheckSquare className="h-4 w-4 text-success" />
              </div>
              <p className="text-xs text-muted-foreground">Reliable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
