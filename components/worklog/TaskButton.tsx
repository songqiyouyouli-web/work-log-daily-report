"use client";

import { contrastingTextColor, taskColor } from "@/lib/taskColors";
import type { Task } from "@/lib/types";

type Props = {
  task: Task;
  index: number;
  isRunning: boolean;
  onPress: () => void;
};

export function TaskButton({ task, index, isRunning, onPress }: Props) {
  const color = taskColor(index);

  return (
    <button
      type="button"
      onClick={onPress}
      className="min-h-24 w-full select-none rounded-2xl border-2 p-4 text-lg font-semibold shadow-sm touch-manipulation"
      style={
        isRunning
          ? { backgroundColor: color, borderColor: color, color: contrastingTextColor(color) }
          : { backgroundColor: `${color}1a`, borderColor: color, color: "#171717" }
      }
    >
      {task.name}
    </button>
  );
}
