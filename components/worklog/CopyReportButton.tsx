"use client";

import { useEffect, useState } from "react";

type Props = {
  reportText: string;
};

export function CopyReportButton({ reportText }: Props) {
  const [value, setValue] = useState(reportText);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => setValue(reportText), [reportText]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus(legacyCopyFallback(value) ? "copied" : "failed");
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={16}
        className="w-full rounded-lg border border-black/10 p-3 font-mono text-sm"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg bg-[#5a7389] px-4 py-2 font-semibold text-white"
        >
          日報をコピー
        </button>
        {status === "copied" && <span className="text-sm text-green-600">コピーしました</span>}
        {status === "failed" && (
          <span className="text-sm text-red-500">コピーに失敗しました。上のテキストを選択してコピーしてください</span>
        )}
      </div>
    </div>
  );
}
