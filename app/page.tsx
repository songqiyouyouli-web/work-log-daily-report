"use client";

import { GoalField } from "@/components/worklog/GoalField";
import { RunningTaskBanner } from "@/components/worklog/RunningTaskBanner";
import { StopButton } from "@/components/worklog/StopButton";
import { TaskGrid } from "@/components/worklog/TaskGrid";
import { TaskManager } from "@/components/worklog/TaskManager";
import { useWorkLog } from "@/lib/useWorkLog";

export default function Home() {
  const {
    isLoaded,
    tasks,
    runningEntry,
    todayGoal,
    startTask,
    stopCurrent,
    addTask,
    renameTask,
    deleteTask,
    setTodayGoal,
  } = useWorkLog();

  if (!isLoaded) return null;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-6 sm:max-w-xl">
      <GoalField label="今日の目標" value={todayGoal.today} onChange={setTodayGoal} />
      <RunningTaskBanner runningEntry={runningEntry} />
      <TaskGrid tasks={tasks} runningTaskId={runningEntry?.taskId ?? null} onSelectTask={startTask} />
      <StopButton disabled={runningEntry === null} onStop={stopCurrent} />
      <TaskManager tasks={tasks} onAdd={addTask} onRename={renameTask} onDelete={deleteTask} />
    </div>
  );
}
