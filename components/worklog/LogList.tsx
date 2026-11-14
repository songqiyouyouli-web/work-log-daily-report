"use client";

import { useMemo } from "react";
import { groupEntriesByTask } from "@/lib/aggregate";
import { taskColor } from "@/lib/taskColors";
import { formatHoursMinutes } from "@/lib/time";
import type { LogEntry, Task } from "@/lib/types";
import { LogEntryEditRow } from "./LogEntryEditRow";

type Props = {
  entries: LogEntry[];
  tasks: Task[];
  onUpdate: (id: string, patch: Partial<Pick<LogEntry, "startTime" | "endTime" | "memo">>) => void;
  onDelete: (id: string) => void;
};

export function LogList({ entries, tasks, onUpdate, onDelete }: Props) {
  const groups = useMemo(() => groupEntriesByTask(entries, tasks, new Date()), [entries, tasks]);

  if (groups.length === 0) {
    return <p className="text-sm text-[#5e5953]">今日の記録はまだありません。</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => {
        const color = taskColor(group.colorIndex);
        return (
          <div key={group.taskId} className="overflow-hidden rounded-xl border border-black/5">
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{ backgroundColor: `${color}1a` }}
            >
              <span className="font-semibold" style={{ color }}>
                {group.taskName}
              </span>
              <span className="text-sm font-semibold text-[#5e5953]">
                計 {formatHoursMinutes(group.minutes)}
              </span>
            </div>
            <div className="flex flex-col gap-2 p-2">
              {group.entries.map((entry) => (
                <LogEntryEditRow key={entry.id} entry={entry} onUpdate={onUpdate} onDelete={onDelete} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
