"use client";

import { useState } from "react";
import type { ComposedSections } from "@/lib/report";

type Props = {
  initialNotes: string;
  todayGoal: string;
  nextDayGoal: string;
  onComposed: (sections: ComposedSections) => void;
};

export function ReportComposer({ initialNotes, todayGoal, nextDayGoal, onComposed }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleCompose() {
    setStatus("loading");
    try {
      const res = await fetch("/api/compose-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, todayGoal, nextDayGoal }),
      });
      if (!res.ok) throw new Error("failed");
      const sections: ComposedSections = await res.json();
      onComposed(sections);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#2e2b28]">メモ（箇条書きでOK）</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={5}
        className="w-full rounded-lg border border-black/10 p-3 text-sm"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCompose}
          disabled={status === "loading"}
          className="rounded-lg bg-[#5a7389] px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          {status === "loading" ? "作成中…" : "AIで文章にする"}
        </button>
        {status === "error" && (
          <span className="text-sm text-red-500">
            うまく文章にできませんでした。もう一度試すか、下の下書きを直接編集してください
          </span>
        )}
      </div>
    </div>
  );
}
