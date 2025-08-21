"use client";

import React from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { CheckCircle, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  showCard?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <CheckCircle className="h-8 w-8 text-gray-400" />,
  actionLabel,
  onAction,
  className = "",
  showCard = true,
}) => {
  const content = (
    <div className="text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="flex items-center space-x-2 mx-auto"
        >
          <Plus className="h-4 w-4" />
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  );

  if (!showCard) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="pt-6">{content}</CardContent>
    </Card>
  );
};

export default EmptyState;
