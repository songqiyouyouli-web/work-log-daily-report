"use client";

import { useCallback, useEffect, useState } from "react";
import { loadWorkLogData, saveWorkLogData, STORAGE_KEY } from "./storage";
import { formatDateKey, isSameDay } from "./time";
import type { DailyGoal, LogEntry, Task, WorkLogData } from "./types";

function upsertGoal(goals: DailyGoal[], dateKey: string, patch: Partial<Pick<DailyGoal, "today" | "nextDay">>): DailyGoal[] {
  const existing = goals.find((g) => g.date === dateKey);
  if (existing) {
    return goals.map((g) => (g.date === dateKey ? { ...g, ...patch } : g));
  }
  return [...goals, { date: dateKey, today: "", nextDay: "", ...patch }];
}

export function useWorkLog() {
  const [data, setData] = useState<WorkLogData | null>(null);

  useEffect(() => {
    setData(loadWorkLogData());
  }, []);

  useEffect(() => {
    if (data) saveWorkLogData(data);
  }, [data]);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setData(loadWorkLogData());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const startTask = useCallback((taskId: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const task = prev.tasks.find((t) => t.id === taskId);
      if (!task) return prev;
      const now = new Date().toISOString();
      const entries = prev.entries.map((e) => (e.endTime === null ? { ...e, endTime: now } : e));
      const newEntry: LogEntry = {
        id: crypto.randomUUID(),
        taskId: task.id,
        taskName: task.name,
        startTime: now,
        endTime: null,
      };
      return { ...prev, entries: [...entries, newEntry] };
    });
  }, []);

  const stopCurrent = useCallback(() => {
    setData((prev) => {
      if (!prev) return prev;
      const now = new Date().toISOString();
      const entries = prev.entries.map((e) => (e.endTime === null ? { ...e, endTime: now } : e));
      return { ...prev, entries };
    });
  }, []);

  const addTask = useCallback((name: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const order = prev.tasks.length > 0 ? Math.max(...prev.tasks.map((t) => t.order)) + 1 : 0;
      const newTask: Task = { id: crypto.randomUUID(), name, order };
      return { ...prev, tasks: [...prev.tasks, newTask] };
    });
  }, []);

  const renameTask = useCallback((id: string, name: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, tasks: prev.tasks.map((t) => (t.id === id ? { ...t, name } : t)) };
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, tasks: prev.tasks.filter((t) => t.id !== id) };
    });
  }, []);

  const updateEntry = useCallback((id: string, patch: Partial<Pick<LogEntry, "startTime" | "endTime" | "memo">>) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, entries: prev.entries.map((e) => (e.id === id ? { ...e, ...patch } : e)) };
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, entries: prev.entries.filter((e) => e.id !== id) };
    });
  }, []);

  const setTodayGoal = useCallback((text: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, goals: upsertGoal(prev.goals, formatDateKey(new Date()), { today: text }) };
    });
  }, []);

  const setNextDayGoal = useCallback((text: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, goals: upsertGoal(prev.goals, formatDateKey(new Date()), { nextDay: text }) };
    });
  }, []);

  const isLoaded = data !== null;
  const tasks = data?.tasks ?? [];
  const entries = data?.entries ?? [];
  const goals = data?.goals ?? [];
  const runningEntry = entries.find((e) => e.endTime === null) ?? null;
  const todayEntries = isLoaded ? entries.filter((e) => isSameDay(new Date(e.startTime), new Date())) : [];
  const todayGoal: DailyGoal = isLoaded
    ? (goals.find((g) => g.date === formatDateKey(new Date())) ?? { date: formatDateKey(new Date()), today: "", nextDay: "" })
    : { date: "", today: "", nextDay: "" };

  return {
    isLoaded,
    tasks,
    entries,
    todayEntries,
    runningEntry,
    todayGoal,
    startTask,
    stopCurrent,
    addTask,
    renameTask,
    deleteTask,
    updateEntry,
    deleteEntry,
    setTodayGoal,
    setNextDayGoal,
  };
}
