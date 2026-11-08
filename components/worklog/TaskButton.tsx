"use client";

import type { Task } from "@/lib/types";

type Props = {
  task: Task;
  isRunning: boolean;
  onPress: () => void;
};

export function TaskButton({ task, isRunning, onPress }: Props) {
  return (
    <button
      type="button"
      onClick={onPress}
      data-running={isRunning}
      className="min-h-24 w-full select-none rounded-xl border border-black/10 p-4 text-lg font-semibold text-foreground touch-manipulation data-[running=true]:border-transparent data-[running=true]:bg-foreground data-[running=true]:text-background dark:border-white/10"
    >
      {task.name}
    </button>
  );
}
