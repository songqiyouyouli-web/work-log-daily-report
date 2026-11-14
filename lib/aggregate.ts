import { minutesBetween } from "./time";
import type { LogEntry, Task, TaskTotal } from "./types";

export function aggregateByTask(entries: LogEntry[], tasks: Task[], now: Date): TaskTotal[] {
  const totals = new Map<string, TaskTotal>();

  for (const task of tasks) {
    totals.set(task.id, { taskId: task.id, taskName: task.name, minutes: 0 });
  }

  for (const entry of entries) {
    const end = entry.endTime ?? now.toISOString();
    const minutes = minutesBetween(entry.startTime, end);
    const existing = totals.get(entry.taskId);
    if (existing) {
      existing.minutes += minutes;
    } else {
      totals.set(entry.taskId, { taskId: entry.taskId, taskName: entry.taskName, minutes });
    }
  }

  return Array.from(totals.values());
}

export type TaskEntryGroup = {
  taskId: string;
  taskName: string;
  colorIndex: number;
  entries: LogEntry[];
  minutes: number;
};

export function groupEntriesByTask(entries: LogEntry[], tasks: Task[], now: Date): TaskEntryGroup[] {
  const order = new Map(tasks.map((t, i) => [t.id, i]));
  const groups = new Map<string, TaskEntryGroup>();

  for (const entry of entries) {
    const existing = groups.get(entry.taskId);
    const end = entry.endTime ?? now.toISOString();
    const minutes = minutesBetween(entry.startTime, end);
    if (existing) {
      existing.entries.push(entry);
      existing.minutes += minutes;
    } else {
      groups.set(entry.taskId, {
        taskId: entry.taskId,
        taskName: entry.taskName,
        colorIndex: order.get(entry.taskId) ?? order.size,
        entries: [entry],
        minutes,
      });
    }
  }

  for (const group of groups.values()) {
    group.entries.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  return Array.from(groups.values()).sort((a, b) => a.colorIndex - b.colorIndex);
}
