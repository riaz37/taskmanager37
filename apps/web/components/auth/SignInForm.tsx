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
import { ArrowLeft, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

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

    try {
      setIsLoading(true);
      await login(data.email, data.password);
      toast.success("Welcome back! Successfully signed in.");
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle different types of errors
      let errorMessage = "Login failed. Please try again.";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (error?.response?.status === 429) {
        errorMessage = "Too many login attempts. Please try again later.";
      } else if (error?.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/10 container-padding py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Back Navigation */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group mb-8 focus-ring rounded-lg px-3 py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg ring-1 ring-primary/20">
              <CheckCircle className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Sign in to your TaskFlow account to continue managing your tasks
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 bg-card/90 backdrop-blur-sm shadow-xl ring-1 ring-border/20">
          <CardHeader className="space-y-2 pb-6 pt-8 px-8">
            <CardTitle className="text-xl font-semibold text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="form-section">
                        <FormLabel className="text-sm font-medium text-foreground">
                          Email address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-11 transition-all duration-200 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 text-sm rounded-lg"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="form-section">
                        <FormLabel className="text-sm font-medium text-foreground">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="h-11 pr-11 transition-all duration-200 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 text-foreground placeholder:text-muted-foreground/70 text-sm rounded-lg"
                              disabled={isLoading}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50 focus-ring"
                              disabled={isLoading}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-11 text-sm font-semibold btn-primary focus-ring"
                    disabled={isLoading || form.formState.isSubmitting}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/sign-up"
                      className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline focus-ring rounded px-1"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Having trouble signing in? Please check your credentials and try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
