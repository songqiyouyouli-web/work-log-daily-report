"use client";

import { useMemo } from "react";
import { CopyReportButton } from "@/components/worklog/CopyReportButton";
import { GoalField } from "@/components/worklog/GoalField";
import { LogList } from "@/components/worklog/LogList";
import { SummaryChart } from "@/components/worklog/SummaryChart";
import { aggregateByTask } from "@/lib/aggregate";
import { buildDailyReportText } from "@/lib/report";
import { useWorkLog } from "@/lib/useWorkLog";

export default function SummaryPage() {
  const { isLoaded, tasks, todayEntries, todayGoal, updateEntry, deleteEntry, setNextDayGoal } = useWorkLog();

  const totals = useMemo(
    () => (isLoaded ? aggregateByTask(todayEntries, tasks, new Date()) : []),
    [isLoaded, todayEntries, tasks],
  );
  const reportText = useMemo(
    () => (isLoaded ? buildDailyReportText(new Date(), todayGoal.today, todayGoal.nextDay) : ""),
    [isLoaded, todayGoal],
  );

  if (!isLoaded) return null;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-6 sm:max-w-xl">
      <section>
        <h2 className="mb-2 text-lg font-semibold">集計</h2>
        <SummaryChart totals={totals} />
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold">今日の記録</h2>
        <LogList entries={todayEntries} onUpdate={updateEntry} onDelete={deleteEntry} />
      </section>
      <section>
        <GoalField label="次の日の目標" value={todayGoal.nextDay} onChange={setNextDayGoal} />
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold">日報の下書き</h2>
        <CopyReportButton reportText={reportText} />
      </section>
    </div>
  );
}
