'use client';

import React from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  className?: string;
  showCard?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  className = '',
  showCard = true,
}) => {
  const content = (
    <div className="text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{error}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="flex items-center space-x-2 mx-auto">
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
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
      <CardContent className="pt-6">
        {content}
      </CardContent>
    </Card>
  );
};

export default ErrorState; 