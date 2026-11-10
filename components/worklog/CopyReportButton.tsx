"use client";

import { useState } from "react";

type Props = {
  reportText: string;
};

export function CopyReportButton({ reportText }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(reportText);
      setStatus("copied");
    } catch {
      setStatus(legacyCopyFallback(reportText) ? "copied" : "failed");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  function legacyCopyFallback(text: string): boolean {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let succeeded = false;
    try {
      succeeded = document.execCommand("copy");
    } catch {
      succeeded = false;
    }
    document.body.removeChild(textarea);
    return succeeded;
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        readOnly
        value={reportText}
        rows={16}
        className="w-full rounded-lg border border-black/10 p-3 font-mono text-sm dark:border-white/10 dark:bg-black"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg bg-foreground px-4 py-2 font-semibold text-background"
        >
          日報をコピー
        </button>
        {status === "copied" && <span className="text-sm text-green-600 dark:text-green-400">コピーしました</span>}
        {status === "failed" && (
          <span className="text-sm text-red-500">コピーに失敗しました。上のテキストを選択してコピーしてください</span>
        )}
      </div>
    </div>
  );
}
