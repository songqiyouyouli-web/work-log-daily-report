"use client";

import { GoalField } from "@/components/worklog/GoalField";
import { MemoField } from "@/components/worklog/MemoField";
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
    updateEntry,
  } = useWorkLog();

  if (!isLoaded) return null;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6 sm:max-w-xl">
      <section className="rounded-2xl border border-black/5 bg-[#fbfaf7] p-4 shadow-sm">
        <GoalField label="今日の目標" value={todayGoal.today} onChange={setTodayGoal} />
      </section>
      <RunningTaskBanner
        runningEntry={runningEntry}
        colorIndex={runningEntry ? Math.max(0, tasks.findIndex((t) => t.id === runningEntry.taskId)) : 0}
      />
      {runningEntry && (
        <section className="rounded-2xl border border-black/5 bg-[#fbfaf7] p-4 shadow-sm">
          <MemoField
            value={runningEntry.memo ?? ""}
            onChange={(memo) => updateEntry(runningEntry.id, { memo })}
          />
        </section>
      )}
      <TaskGrid tasks={tasks} runningTaskId={runningEntry?.taskId ?? null} onSelectTask={startTask} />
      <StopButton disabled={runningEntry === null} onStop={stopCurrent} />
      <TaskManager tasks={tasks} onAdd={addTask} onRename={renameTask} onDelete={deleteTask} />
    </div>
  );
}
