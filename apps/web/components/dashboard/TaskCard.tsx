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
  FileText,
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

  const getStatusColor = (completed: boolean) => {
    return completed
      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
      : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  };

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-primary/20">
      <CardHeader className="pb-4 space-y-4">
        {/* Header with title and actions */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold leading-tight line-clamp-2 pr-2 group-hover:text-primary transition-colors">
              {task.title}
            </CardTitle>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Badge 
              variant="outline"
              className={`text-xs font-medium border ${getStatusColor(task.completed)}`}
            >
              <span className="mr-1.5">{getStatusIcon(task.completed)}</span>
              {task.completed ? "Completed" : "Pending"}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-muted/50"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
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
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(task)} className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Task
                </DropdownMenuItem>
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

        {/* Description */}
        {task.description && (
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Task metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
            </div>
            {task.updatedAt !== task.createdAt && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center space-x-2 pt-2 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggle(task)}
            className="flex-1 h-8 text-xs border-border/50 hover:bg-muted/50 hover:border-primary/50"
          >
            {task.completed ? (
              <>
                <Circle className="w-3 h-3 mr-1" />
                Mark Incomplete
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Mark Complete
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0 border-border/50 hover:bg-muted/50 hover:border-primary/50"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
