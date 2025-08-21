"use client";

import React, { useState } from "react";
import { HeaderProps } from "@repo/types/src/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  LogOut, 
  Bell,
  Search,
  Command,
  Settings,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
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
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tasks, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-blue w-full h-9 pl-10 pr-12"
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
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-lg hover:bg-muted/50 transition-all duration-200"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-error rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-error-foreground">3</span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
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

            {/* Create Task Button */}
            <Button 
              onClick={onCreateTask} 
              size="default" 
              className="btn-blue-primary shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

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
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="w-64" 
                align="end" 
                forceMount
                sideOffset={8}
              >
                {/* User Profile Section */}
                <DropdownMenuLabel className="p-0">
                  <div className="flex items-center space-x-4 p-4 border-b border-border/50">
                    <Avatar className="h-12 w-12 ring-2 ring-border/30">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
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
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-muted/50 focus:bg-muted/50 transition-colors">
                      <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Preferences</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2" />
                  
                  {/* Sign Out */}
                  <DropdownMenuItem 
                    onClick={onLogout} 
                    className="p-3 cursor-pointer rounded-lg hover:bg-error/10 focus:bg-error/10 text-error hover:text-error transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Sign Out</span>
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
