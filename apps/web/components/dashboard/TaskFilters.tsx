"use client";

import React from "react";
import { TaskFiltersProps } from "@repo/types/src/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, SortAsc, SortDesc, ArrowUpDown } from "lucide-react";

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
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Filters & Search
            </h3>
            <p className="text-sm text-muted-foreground">
              Refine your task list with powerful filters
            </p>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10 border-border/50 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <Select value={filterStatus} onValueChange={onFilterChange}>
              <SelectTrigger className="h-10 border-border/50 focus:border-primary focus:ring-primary/20">
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sort By</label>
            <Select value={sortBy} onValueChange={onSortByChange}>
              <SelectTrigger className="h-10 border-border/50 focus:border-primary focus:ring-primary/20">
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Order</label>
            <Button
              variant="outline"
              onClick={() =>
                onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
              }
              className="w-full h-10 border-border/50 hover:bg-muted/50 focus:border-primary focus:ring-primary/20"
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

        {/* Active Filters Summary */}
        {(searchTerm || filterStatus !== "all") && (
          <div className="flex items-center space-x-2 pt-2 border-t border-border/50">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                Search: "{searchTerm}"
              </span>
            )}
            {filterStatus !== "all" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                Status: {filterStatus}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
