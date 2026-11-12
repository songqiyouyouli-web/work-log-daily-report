"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TaskTotal } from "@/lib/types";

type Props = {
  totals: TaskTotal[];
};

const COLORS = { bar: "#2a78d6", axis: "#898781", grid: "#e1e0d9", tooltipBg: "#fcfcfb", tooltipText: "#0b0b0b" };

export function SummaryChart({ totals }: Props) {
  const hasData = totals.some((t) => t.minutes > 0);

  if (!hasData) {
    return <p className="text-sm text-zinc-500">まだ集計できるデータがありません。</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={totals}>
        <CartesianGrid stroke={COLORS.grid} vertical={false} />
        <XAxis dataKey="taskName" stroke={COLORS.axis} tick={{ fill: COLORS.axis }} />
        <YAxis unit="分" stroke={COLORS.axis} tick={{ fill: COLORS.axis }} />
        <Tooltip
          formatter={(value) => `${value}分`}
          contentStyle={{ backgroundColor: COLORS.tooltipBg, color: COLORS.tooltipText, border: "none" }}
        />
        <Bar dataKey="minutes" fill={COLORS.bar} radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}
