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
