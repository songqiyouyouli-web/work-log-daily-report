"use client";

import { formatDuration, toTimeInputValue, withTimeInputValue } from "@/lib/time";
import type { LogEntry } from "@/lib/types";

type Props = {
  entry: LogEntry;
  onUpdate: (id: string, patch: Partial<Pick<LogEntry, "startTime" | "endTime" | "memo">>) => void;
  onDelete: (id: string) => void;
};

export function LogEntryEditRow({ entry, onUpdate, onDelete }: Props) {
  const endTime = entry.endTime ?? new Date().toISOString();
  const durationMs = new Date(endTime).getTime() - new Date(entry.startTime).getTime();

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-black/10 p-3 dark:border-white/10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="min-w-20 flex-1 font-semibold">{entry.taskName}</span>
        <input
          type="time"
          value={toTimeInputValue(entry.startTime)}
          onChange={(e) => onUpdate(entry.id, { startTime: withTimeInputValue(entry.startTime, e.target.value) })}
          className="rounded border border-black/10 px-2 py-1 dark:border-white/10 dark:bg-black"
        />
        <span>〜</span>
        {entry.endTime === null ? (
          <span className="text-sm text-zinc-500">実行中</span>
        ) : (
          <input
            type="time"
            value={toTimeInputValue(entry.endTime)}
            onChange={(e) => onUpdate(entry.id, { endTime: withTimeInputValue(entry.endTime as string, e.target.value) })}
            className="rounded border border-black/10 px-2 py-1 dark:border-white/10 dark:bg-black"
          />
        )}
        <span className="font-mono text-sm text-zinc-500">{formatDuration(durationMs)}</span>
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          className="rounded border border-black/10 px-2 py-1 text-sm text-red-500 dark:border-white/10"
        >
          削除
        </button>
      </div>
      <input
        type="text"
        value={entry.memo ?? ""}
        onChange={(e) => onUpdate(entry.id, { memo: e.target.value })}
        placeholder="気づきメモ"
        className="rounded border border-black/10 px-2 py-1 text-sm dark:border-white/10 dark:bg-black"
      />
    </div>
  );
}
