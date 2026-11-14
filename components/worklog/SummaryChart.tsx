"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { taskColor } from "@/lib/taskColors";
import type { TaskTotal } from "@/lib/types";

type Props = {
  totals: TaskTotal[];
};

const COLORS = { axis: "#5e5953", grid: "#e3ddd2", tooltipBg: "#fbfaf7", tooltipText: "#2e2b28" };

export function SummaryChart({ totals }: Props) {
  const hasData = totals.some((t) => t.minutes > 0);

  if (!hasData) {
    return <p className="text-sm text-[#5e5953]">まだ集計できるデータがありません。</p>;
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
        <Bar dataKey="minutes" radius={4}>
          {totals.map((t, i) => (
            <Cell key={t.taskId} fill={taskColor(i)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
