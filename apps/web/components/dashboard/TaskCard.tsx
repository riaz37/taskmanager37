"use client";

import React from "react";
import { TaskCardProps } from "@repo/types/src/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  Calendar,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const getStatusStyles = (completed: boolean) => {
    return completed
      ? "status-completed"
      : "status-pending";
  };

  const getStatusIcon = (completed: boolean) => {
    return completed ? (
      <CheckCircle className="w-4 h-4" />
    ) : (
      <Circle className="w-4 h-4" />
    );
  };

  return (
    <Card className="group card-hover border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:bg-card">
      <CardHeader className="pb-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 pr-2 group-hover:text-primary transition-colors">
              {task.title}
            </CardTitle>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Badge 
              variant="secondary" 
              className={`${getStatusStyles(task.completed)} border px-2 py-1 text-xs font-medium`}
            >
              <span className="mr-1.5">{getStatusIcon(task.completed)}</span>
              {task.completed ? "Completed" : "Pending"}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity focus-ring"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onToggle(task)} className="cursor-pointer">
                  {task.completed ? (
                    <>
                      <Circle className="w-4 h-4 mr-2" />
                      Mark Incomplete
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(task)} className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete(task._id)} 
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {task.description && (
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {task.description}
            </p>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
              </span>
            </div>
            {task.updatedAt !== task.createdAt && (
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Mobile Only */}
        <div className="flex sm:hidden items-center justify-between pt-3 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggle(task)}
            className="h-8 text-xs flex-1 mr-2"
          >
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(task._id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive border-destructive/50 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
