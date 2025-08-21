"use client";

import React from "react";
import { TaskCardProps } from "@repo/types/src/react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Edit, Trash2, CheckCircle, Circle, Calendar, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const getStatusColor = (completed: boolean) => {
    return completed 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
  };

  const getStatusIcon = (completed: boolean) => {
    return completed ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />;
  };

  return (
    <Card className="card-hover group border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between space-y-2">
          <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 pr-4">
            {task.title}
          </CardTitle>
          <Badge variant="secondary" className={getStatusColor(task.completed)}>
            <span className="mr-1">{getStatusIcon(task.completed)}</span>
            {task.completed ? 'Completed' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {task.description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggle(task)}
            className="h-8 text-xs"
          >
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 text-xs"
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(task._id)}
              className="h-8 text-xs text-destructive hover:text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
