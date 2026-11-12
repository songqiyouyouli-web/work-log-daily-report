import { formatJapaneseDate } from "./time";

const PLACEHOLDER = "（ここに入力）";

export type ComposedSections = {
  achievementStatus?: string;
  result?: string;
  action?: string;
  actionStatus?: string;
  learning?: string;
};

export function buildDailyReportText(
  date: Date,
  todayGoal: string,
  nextDayGoal: string,
  composed?: ComposedSections,
): string {
  const sections: [string, string][] = [
    ["今日の仕事は何点ですか？(1〜5)", PLACEHOLDER],
    ["目標", todayGoal.trim() || PLACEHOLDER],
    ["目標の達成状況（数値で達成できたかわかる目標）", composed?.achievementStatus?.trim() || PLACEHOLDER],
    ["目標に対しての実績", composed?.result?.trim() || PLACEHOLDER],
    ["目標達成のためのアクション", composed?.action?.trim() || PLACEHOLDER],
    ["アクションの実施状況", composed?.actionStatus?.trim() || PLACEHOLDER],
    ["前日に掲げたアクションが実行できたかどうか／今日の学び・気づき", composed?.learning?.trim() || PLACEHOLDER],
    ["次回出勤日の目標とアクション", nextDayGoal.trim() || PLACEHOLDER],
    ["自由記述（あれば）（任意）", PLACEHOLDER],
  ];

  const lines: string[] = [`【日報】${formatJapaneseDate(date)}`, ""];

  for (const [heading, content] of sections) {
    lines.push(`■${heading}`);
    lines.push(content);
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}
