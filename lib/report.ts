import { formatHoursMinutes, formatJapaneseDate } from "./time";
import type { TaskTotal } from "./types";

export function buildDailyReportText(
  totals: TaskTotal[],
  date: Date,
  todayGoal: string,
  nextDayGoal: string,
): string {
  const nonZero = totals.filter((t) => t.minutes > 0).sort((a, b) => b.minutes - a.minutes);
  const totalMinutes = nonZero.reduce((sum, t) => sum + t.minutes, 0);

  const lines: string[] = [`【本日の業務】${formatJapaneseDate(date)}`];

  if (todayGoal.trim()) {
    lines.push(`目標：${todayGoal.trim()}`);
  }

  lines.push("");

  if (nonZero.length === 0) {
    lines.push("（記録なし）");
  } else {
    for (const t of nonZero) {
      lines.push(`・${t.taskName}：${formatHoursMinutes(t.minutes)}`);
    }
    lines.push("");
    lines.push(`合計：${formatHoursMinutes(totalMinutes)}`);
  }

  if (nextDayGoal.trim()) {
    lines.push("");
    lines.push(`明日の予定：${nextDayGoal.trim()}`);
  }

  return lines.join("\n");
}
