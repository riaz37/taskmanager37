"use client";

import React, { useState } from "react";
import { HeaderProps } from "@repo/types/src/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  LogOut, 
  User, 
  Settings, 
  Sparkles, 
  Bell,
  Search,
  Command,
  HelpCircle,
  Keyboard,
  Palette,
  Shield,
  Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Header: React.FC<HeaderProps> = ({ user, onLogout, onCreateTask }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search query:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-header border-b border-border/50">
      <div className="container-modern">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Section */}
          <div className="flex items-center space-x-4 min-w-0">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary-hover to-accent shadow-lg ring-1 ring-primary/20">
                <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
              </div>
              <div className="hidden sm:flex flex-col min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-foreground truncate">
                  TaskFlow
                </h1>
                <p className="text-xs text-muted-foreground truncate">
                  Welcome back, {user.name.split(' ')[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tasks, projects, or team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-12 bg-background/50 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg text-sm placeholder:text-muted-foreground/70"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Badge variant="outline" className="px-1.5 py-0.5 text-xs font-mono">
                    <Command className="w-3 h-3 mr-1" />
                    K
                  </Badge>
                </div>
              </div>
            </form>
          </div>

          {/* Actions Section */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-lg hover:bg-muted/50 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-lg hover:bg-muted/50 transition-all duration-200"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-destructive-foreground">3</span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 glass-card" align="end" sideOffset={8}>
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="secondary" className="text-xs">3 new</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="p-4 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">Task "Design Review" is due tomorrow</p>
                        <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">Sarah completed "User Research"</p>
                        <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">Weekly team meeting in 30 minutes</p>
                        <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 cursor-pointer text-center justify-center text-sm font-medium">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Create Task Button - Desktop */}
            <Button 
              onClick={onCreateTask} 
              size="default" 
              className="hidden sm:inline-flex h-9 px-4 font-medium shadow-lg hover:shadow-xl transition-all duration-200 interactive-scale"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>

            {/* Create Task Button - Mobile */}
            <Button
              onClick={onCreateTask}
              size="icon"
              className="sm:hidden h-9 w-9 shadow-lg hover:shadow-xl transition-all duration-200 interactive-scale"
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative h-9 w-9 rounded-lg hover:bg-muted/50 focus-visible:ring-primary transition-all duration-200"
                >
                  <Avatar className="h-7 w-7 ring-2 ring-border/50 transition-all hover:ring-primary/30">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-accent to-accent-hover text-accent-foreground text-xs font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="w-80 glass-card border-0 shadow-2xl" 
                align="end" 
                forceMount
                sideOffset={8}
              >
                {/* User Profile Section */}
                <DropdownMenuLabel className="p-0">
                  <div className="flex items-center space-x-4 p-4 border-b border-border/50">
                    <Avatar className="h-12 w-12 ring-2 ring-border/30">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-accent to-accent-hover text-accent-foreground font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                        <span className="text-xs text-success font-medium">Online</span>
                        <Badge variant="outline" className="text-xs px-2 py-0.5">Pro</Badge>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                <div className="p-2">
                  {/* Account Section */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <User className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Profile Settings</span>
                      <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Preferences</span>
                      <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <Activity className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Activity Log</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2" />

                  {/* Appearance Section */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <Palette className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Appearance</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <Keyboard className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Keyboard Shortcuts</span>
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    {/* Mobile Theme Toggle */}
                    <div className="sm:hidden p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Palette className="mr-3 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Theme</span>
                        </div>
                        <ThemeToggle />
                      </div>
                    </div>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2" />

                  {/* Help & Support */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <HelpCircle className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Help & Support</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <Shield className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Privacy & Security</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  {/* Sign Out */}
                  <DropdownMenuItem 
                    onClick={onLogout} 
                    className="p-3 cursor-pointer rounded-lg hover:bg-destructive/10 focus:bg-destructive/10 text-destructive hover:text-destructive transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Sign Out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
