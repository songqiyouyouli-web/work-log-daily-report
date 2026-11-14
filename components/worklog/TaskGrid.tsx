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
    return <p className="text-sm text-[#5e5953]">作業ボタンがありません。下の「作業の管理」から追加してください。</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {tasks.map((task, index) => (
        <TaskButton
          key={task.id}
          task={task}
          index={index}
          isRunning={task.id === runningTaskId}
          onPress={() => onSelectTask(task.id)}
        />
      ))}
    </div>
  );
}
