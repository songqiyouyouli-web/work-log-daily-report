"use client";

import type { LogEntry } from "@/lib/types";
import { LogEntryEditRow } from "./LogEntryEditRow";

type Props = {
  entries: LogEntry[];
  onUpdate: (id: string, patch: Partial<Pick<LogEntry, "startTime" | "endTime" | "memo">>) => void;
  onDelete: (id: string) => void;
};

export function LogList({ entries, onUpdate, onDelete }: Props) {
  if (entries.length === 0) {
    return <p className="text-sm text-zinc-500">今日の記録はまだありません。</p>;
  }

  const sorted = [...entries].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((entry) => (
        <LogEntryEditRow key={entry.id} entry={entry} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
