"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  state: string;
  onStateChange: (value: string) => void;
  courseType: string;
  onCourseTypeChange: (value: string) => void;
  budget: string;
  onBudgetChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const selectClass =
  "h-11 rounded-lg border border-border bg-white px-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-light";

export function FilterBar({
  search,
  onSearchChange,
  state,
  onStateChange,
  courseType,
  onCourseTypeChange,
  budget,
  onBudgetChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-30 border-b border-border bg-white/95 py-4 backdrop-blur-md">
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            className="pl-10"
            placeholder="Search university, course or city..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select className={selectClass} value={state} onChange={(e) => onStateChange(e.target.value)}>
            <option value="All">All States</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Delhi">Delhi NCR</option>
            <option value="Haryana">Haryana</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
          <select className={selectClass} value={courseType} onChange={(e) => onCourseTypeChange(e.target.value)}>
            <option value="All">All Course Types</option>
            <option value="Engineering">Engineering</option>
            <option value="Health & Allied">Health & Allied</option>
            <option value="Management">Management</option>
            <option value="Law">Law</option>
            <option value="Design">Design</option>
          </select>
          <select className={selectClass} value={budget} onChange={(e) => onBudgetChange(e.target.value)}>
            <option value="All">All Budgets</option>
            <option value="Under ₹2L">Under ₹2L</option>
            <option value="₹2L-₹5L">₹2L-₹5L</option>
            <option value="₹5L+">₹5L+</option>
          </select>
          <select className={selectClass} value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="ranking">Sort: Ranking</option>
            <option value="name">Sort: Name</option>
            <option value="fees">Sort: Fees (Low-High)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
