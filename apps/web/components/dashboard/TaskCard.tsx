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
    <Card className="group transition-all duration-200">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-medium leading-tight line-clamp-2 pr-2">
              {task.title}
            </CardTitle>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Badge 
              variant={task.completed ? "default" : "secondary"}
              className="text-xs font-medium"
            >
              <span className="mr-1.5">{getStatusIcon(task.completed)}</span>
              {task.completed ? "Completed" : "Pending"}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
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
      </CardHeader>

      <CardContent className="pt-0">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
            {task.description}
          </p>
        )}

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
      </CardContent>
    </Card>
  );
};

export default TaskCard;
