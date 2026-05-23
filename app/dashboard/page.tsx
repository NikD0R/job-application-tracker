import KanbanBoard from "@/components/kanban-board";
import KanbanBoardSkeleton from "@/components/kanban-board-skeleton";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard - Job Application Tracker",
  description: "Your job application dashboard",
};

async function getBoard(userId: string) {
  "use cache";

  await connectDB();

  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!boardDoc) {
    return null;
  }

  const board = JSON.parse(JSON.stringify(boardDoc));

  return board;
}

async function DashboardPage() {
  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">{board.name}</h1>
          <p className="text-muted-foreground">Track your job applications</p>
        </div>
        <KanbanBoard
          board={board}
          userId={session.user.id}
        />
      </div>
    </div>
  );
}

export default async function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="container mx-auto p-6">
            <div className="mb-6 space-y-2 animate-pulse">
              <div className="h-8 w-48 rounded bg-muted" />
              <div className="h-4 w-64 rounded bg-muted" />
            </div>
            <KanbanBoardSkeleton />
          </div>
        </div>
      }
    >
      <DashboardPage></DashboardPage>
    </Suspense>
  );
}
