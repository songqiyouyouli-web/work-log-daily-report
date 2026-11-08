import type { WorkLogData } from "./types";

export const STORAGE_KEY = "worklog:v1";

export const DEFAULT_TASKS: WorkLogData["tasks"] = [
  { id: "task-doc-check", name: "書類確認", order: 0 },
  { id: "task-email", name: "メール対応", order: 1 },
  { id: "task-meeting", name: "会議", order: 2 },
];

function defaultData(): WorkLogData {
  return { version: 1, tasks: DEFAULT_TASKS, entries: [], goals: [] };
}

export function loadWorkLogData(): WorkLogData {
  if (typeof window === "undefined") return defaultData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.entries)) {
      return defaultData();
    }
    return { ...parsed, goals: Array.isArray(parsed.goals) ? parsed.goals : [] } as WorkLogData;
  } catch {
    return defaultData();
  }
}

export function saveWorkLogData(data: WorkLogData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
