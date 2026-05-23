"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";
import { FilterState } from "@/components/search-filter-bar";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setLocalFilters] = useState<FilterState>({
    query: searchParams.get("query") || "",
    tag: searchParams.get("tag") || "",
    createdAt: searchParams.get("createdAt") || "",
  });

  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setColumns(initialBoard.columns || []);
    }
  }, [initialBoard]);

  useEffect(() => {
    setLocalFilters({
      query: searchParams.get("query") || "",
      tag: searchParams.get("tag") || "",
      createdAt: searchParams.get("createdAt") || "",
    });
  }, [searchParams]);

  const setFilters = (newFilters: FilterState) => {
    setLocalFilters(newFilters);

    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.query) {
      params.set("query", newFilters.query);
    } else {
      params.delete("query");
    }

    if (newFilters.tag) {
      params.set("tag", newFilters.tag);
    } else {
      params.delete("tag");
    }

    if (newFilters.createdAt) {
      params.set("createdAt", newFilters.createdAt);
    } else {
      params.delete("createdAt");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredColumns = columns.map((col) => ({
    ...col,
    jobApplications: col.jobApplications.filter((job) => {
      const query = filters.query.toLowerCase();
      const matchesQuery =
        !query ||
        job.company.toLowerCase().includes(query) ||
        job.position.toLowerCase().includes(query) ||
        (job.location ?? "").toLowerCase().includes(query);

      const matchesTag =
        !filters.tag ||
        (job.tags ?? []).some((t) =>
          t.toLowerCase().includes(filters.tag.toLowerCase()),
        );

      const jobDateStr = job.createdAt
        ? new Date(job.createdAt).toISOString().split("T")[0]
        : null;

      const matchesDate =
        !filters.createdAt || jobDateStr === filters.createdAt;

      return matchesQuery && matchesTag && matchesDate;
    }),
  }));

  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      // Find and remove job from the old column

      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (job) => job._id === jobApplicationId,
        );
        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnId = col._id;
          col.jobApplications = col.jobApplications.filter(
            (job) => job._id !== jobApplicationId,
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId,
        );

        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          const jobsWithUpdatedOrders = updatedJobs.map((job, index) => ({
            ...job,
            order: index * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (e) {
      setError("Failed to move job application. Please try again.");
    }
  }

  return {
    board,
    columns,
    error,
    moveJob,
    filteredColumns,
    filters,
    setFilters,
  };
}
