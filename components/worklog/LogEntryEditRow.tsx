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
    <div className="flex flex-col gap-2 rounded-lg bg-[#f2efea] p-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="time"
          value={toTimeInputValue(entry.startTime)}
          onChange={(e) => onUpdate(entry.id, { startTime: withTimeInputValue(entry.startTime, e.target.value) })}
          className="rounded border border-black/10 bg-[#fbfaf7] px-2 py-1"
        />
        <span className="text-[#5e5953]">〜</span>
        {entry.endTime === null ? (
          <span className="text-sm text-[#5e5953]">実行中</span>
        ) : (
          <input
            type="time"
            value={toTimeInputValue(entry.endTime)}
            onChange={(e) => onUpdate(entry.id, { endTime: withTimeInputValue(entry.endTime as string, e.target.value) })}
            className="rounded border border-black/10 bg-[#fbfaf7] px-2 py-1"
          />
        )}
        <span className="font-mono text-sm text-[#5e5953]">{formatDuration(durationMs)}</span>
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          className="ml-auto rounded border border-black/10 bg-[#fbfaf7] px-2 py-1 text-sm text-red-500"
        >
          削除
        </button>
      </div>
      <input
        type="text"
        value={entry.memo ?? ""}
        onChange={(e) => onUpdate(entry.id, { memo: e.target.value })}
        placeholder="気づきメモ"
        className="rounded border border-black/10 bg-[#fbfaf7] px-2 py-1 text-sm"
      />
    </div>
  );
}
