"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TaskTotal } from "@/lib/types";

type Props = {
  totals: TaskTotal[];
};

export function SummaryChart({ totals }: Props) {
  const hasData = totals.some((t) => t.minutes > 0);

  if (!hasData) {
    return <p className="text-sm text-zinc-500">まだ集計できるデータがありません。</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={totals}>
        <XAxis dataKey="taskName" />
        <YAxis unit="分" />
        <Tooltip formatter={(value) => `${value}分`} />
        <Bar dataKey="minutes" fill="#171717" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}
