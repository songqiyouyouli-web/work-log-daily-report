"use client";

import { useEffect, useState } from "react";
import { contrastingTextColor, taskColor } from "@/lib/taskColors";
import { formatDuration } from "@/lib/time";
import type { LogEntry } from "@/lib/types";

type Props = {
  runningEntry: LogEntry | null;
  colorIndex?: number;
};

export function RunningTaskBanner({ runningEntry, colorIndex = 0 }: Props) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!runningEntry) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [runningEntry]);

  if (!runningEntry) {
    return (
      <div className="rounded-2xl border border-black/5 bg-[#fbfaf7] p-4 text-center text-[#5e5953] shadow-sm">
        停止中
      </div>
    );
  }

  const elapsedMs = now - new Date(runningEntry.startTime).getTime();
  const color = taskColor(colorIndex);

  return (
    <div
      className="rounded-2xl p-4 text-center shadow-sm"
      style={{ backgroundColor: color, color: contrastingTextColor(color) }}
    >
      <p className="text-sm opacity-80">実行中</p>
      <p className="text-xl font-bold">{runningEntry.taskName}</p>
      <p className="font-mono text-2xl">{formatDuration(elapsedMs)}</p>
    </div>
  );
}
