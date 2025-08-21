'use client';

import React from 'react';
import { TaskFiltersProps } from '@repo/types/src/react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/select';
import { Search, Filter, SortAsc, SortDesc, ArrowUpDown } from 'lucide-react';

const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchTerm,
  filterStatus,
  sortBy,
  sortOrder,
  onSearchChange,
  onFilterChange,
  onSortByChange,
  onSortOrderChange,
}) => {
  return (
    <div className="bg-card border rounded-lg p-6 mb-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">Filters & Search</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select value={filterStatus} onValueChange={onFilterChange}>
              <SelectTrigger className="h-10">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <Select value={sortBy} onValueChange={onSortByChange}>
              <SelectTrigger className="h-10">
                <ArrowUpDown className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Created Date</SelectItem>
                <SelectItem value="updatedAt">Updated Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div>
            <Button
              variant="outline"
              onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full h-10"
            >
              {sortOrder === "asc" ? (
                <>
                  <SortAsc className="h-4 w-4 mr-2" />
                  Ascending
                </>
              ) : (
                <>
                  <SortDesc className="h-4 w-4 mr-2" />
                  Descending
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
