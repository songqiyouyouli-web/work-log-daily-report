"use client";

import { useEffect, useState } from "react";
import { formatDuration } from "@/lib/time";
import type { LogEntry } from "@/lib/types";

type Props = {
  runningEntry: LogEntry | null;
};

export function RunningTaskBanner({ runningEntry }: Props) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!runningEntry) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [runningEntry]);

  if (!runningEntry) {
    return (
      <div className="rounded-xl border border-black/10 p-4 text-center text-zinc-500">
        停止中
      </div>
    );
  }

  const elapsedMs = now - new Date(runningEntry.startTime).getTime();

  return (
    <div className="rounded-xl bg-[#2a78d6] p-4 text-center text-white">
      <p className="text-sm opacity-80">実行中</p>
      <p className="text-xl font-bold">{runningEntry.taskName}</p>
      <p className="font-mono text-2xl">{formatDuration(elapsedMs)}</p>
    </div>
  );
}
