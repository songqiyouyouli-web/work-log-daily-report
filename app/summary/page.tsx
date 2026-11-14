"use client";

import { useMemo, useState } from "react";
import { CopyReportButton } from "@/components/worklog/CopyReportButton";
import { GoalField } from "@/components/worklog/GoalField";
import { LogList } from "@/components/worklog/LogList";
import { ReportComposer } from "@/components/worklog/ReportComposer";
import { SummaryChart } from "@/components/worklog/SummaryChart";
import { aggregateByTask } from "@/lib/aggregate";
import { buildDailyReportText, type ComposedSections } from "@/lib/report";
import { useWorkLog } from "@/lib/useWorkLog";

export default function SummaryPage() {
  const { isLoaded, tasks, todayEntries, todayGoal, updateEntry, deleteEntry, setNextDayGoal } = useWorkLog();
  const [composed, setComposed] = useState<ComposedSections>({});

  const totals = useMemo(
    () => (isLoaded ? aggregateByTask(todayEntries, tasks, new Date()) : []),
    [isLoaded, todayEntries, tasks],
  );
  const initialNotes = useMemo(
    () =>
      isLoaded
        ? todayEntries
            .filter((e) => e.memo?.trim())
            .map((e) => `・${e.taskName}：${e.memo}`)
            .join("\n")
        : "",
    [isLoaded, todayEntries],
  );
  const reportText = useMemo(
    () => (isLoaded ? buildDailyReportText(new Date(), todayGoal.today, todayGoal.nextDay, composed) : ""),
    [isLoaded, todayGoal, composed],
  );

  if (!isLoaded) return null;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-6 sm:max-w-xl">
      <section className="rounded-2xl border border-black/5 bg-[#fbfaf7] p-4 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-[#2e2b28]">集計</h2>
        <SummaryChart totals={totals} />
      </section>
      <section className="rounded-2xl border border-black/5 bg-[#fbfaf7] p-4 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-[#2e2b28]">今日の記録</h2>
        <LogList entries={todayEntries} tasks={tasks} onUpdate={updateEntry} onDelete={deleteEntry} />
      </section>
      <section className="rounded-2xl border border-black/5 bg-[#fbfaf7] p-4 shadow-sm">
        <GoalField label="次の日の目標" value={todayGoal.nextDay} onChange={setNextDayGoal} />
      </section>
      <section className="rounded-2xl border border-black/5 bg-[#fbfaf7] p-4 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-[#2e2b28]">日報の下書き</h2>
        <ReportComposer
          initialNotes={initialNotes}
          todayGoal={todayGoal.today}
          nextDayGoal={todayGoal.nextDay}
          onComposed={setComposed}
        />
        <div className="mt-3">
          <CopyReportButton reportText={reportText} />
        </div>
      </section>
    </div>
  );
}
