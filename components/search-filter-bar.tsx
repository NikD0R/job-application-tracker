"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export interface FilterState {
  query: string;
  tag: string;
  createdAt: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function SearchFilterBar({ filters, onChange }: Props) {
  const [localQuery, setLocalQuery] = useState(filters.query);
  const [localTag, setLocalTag] = useState(filters.tag);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== filters.query) {
        update({ query: localQuery });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localTag !== filters.tag) {
        update({ tag: localTag });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localTag]);

  function update(partial: Partial<FilterState>) {
    onChange({ ...filters, ...partial });
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search company, position…"
          className="pl-9"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
      </div>
      <Input
        placeholder="Filter by tag"
        className="w-36"
        value={localTag}
        onChange={(e) => setLocalTag(e.target.value)}
      />
      <Input
        type="date"
        className="w-40 cursor-pointer select-none caret-transparent"
        value={filters.createdAt}
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          if ("showPicker" in e.currentTarget) {
            e.currentTarget.showPicker();
          }
        }}
        onChange={(e) => update({ createdAt: e.target.value })}
        onKeyDown={(e) => e.preventDefault()}
      />
    </div>
  );
}
