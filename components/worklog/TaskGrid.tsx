"use client";

import type { Task } from "@/lib/types";
import { TaskButton } from "./TaskButton";

type Props = {
  tasks: Task[];
  runningTaskId: string | null;
  onSelectTask: (taskId: string) => void;
};

export function TaskGrid({ tasks, runningTaskId, onSelectTask }: Props) {
  if (tasks.length === 0) {
    return <p className="text-sm text-zinc-500">作業ボタンがありません。下の「作業の管理」から追加してください。</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {tasks.map((task) => (
        <TaskButton
          key={task.id}
          task={task}
          isRunning={task.id === runningTaskId}
          onPress={() => onSelectTask(task.id)}
        />
      ))}
    </div>
  );
}
