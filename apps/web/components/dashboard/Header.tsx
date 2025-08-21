"use client";

import React from "react";
import { HeaderProps } from "@repo/types/src/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Plus, LogOut, User, Settings, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC<HeaderProps> = ({ user, onLogout, onCreateTask }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto container-padding">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-sm">
              <svg
                className="h-5 w-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Create Task Button */}
            <Button 
              onClick={onCreateTask} 
              size="sm" 
              className="hidden sm:inline-flex btn-primary focus-ring h-9 px-4"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>

            {/* Mobile Create Button */}
            <Button
              onClick={onCreateTask}
              size="sm"
              variant="outline"
              className="sm:hidden h-9 w-9 p-0 focus-ring"
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-9 w-9 rounded-full p-0 focus-ring hover:bg-muted/50"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-border/20 transition-all hover:ring-primary/20">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center p-0">
                      <UserCircle className="h-5 w-5 m-0" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="w-64 p-2" 
                align="end" 
                forceMount
                sideOffset={8}
              >
                {/* User Info */}
                <DropdownMenuLabel className="p-3 font-normal">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center p-0">
                          <UserCircle className="h-6 w-6 m-0" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator className="my-2" />
                
                {/* Menu Items */}
                <DropdownMenuItem className="p-3 cursor-pointer focus:bg-muted/50 rounded-md">
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="p-3 cursor-pointer focus:bg-muted/50 rounded-md">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Preferences</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2" />
                
                <DropdownMenuItem 
                  onClick={onLogout} 
                  className="p-3 cursor-pointer focus:bg-destructive/10 text-destructive hover:text-destructive rounded-md"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
