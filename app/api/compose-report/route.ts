import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  notes: z.string().max(4000),
  todayGoal: z.string().max(2000),
  nextDayGoal: z.string().max(2000),
});

const sectionsSchema = z.object({
  achievementStatus: z.string(),
  result: z.string(),
  action: z.string(),
  actionStatus: z.string(),
  learning: z.string(),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "入力内容を確認してください" }, { status: 400 });
  }
  const { notes, todayGoal, nextDayGoal } = parsed.data;

  try {
    const { output: object } = await generateText({
      model: "openai/gpt-4.1-mini",
      output: Output.object({ schema: sectionsSchema }),
      maxOutputTokens: 1024,
      temperature: 0.2,
      prompt: [
        "あなたは日本企業の会社員が書く日報の下書きを手伝うアシスタントです。",
        "入力される「気づきメモ」は、その人が今日の業務中に書き留めた箇条書きです。これ以外の事実は一切知りません。",
        "",
        "厳守事項：",
        "・気づきメモに書かれている固有名詞・作業内容・出来事だけを使ってください。メモにない取引先名、業務内容、成果、学びを創作してはいけません。",
        "・メモの情報量が少ない項目は、無理に具体的なエピソードを作らず、メモの範囲内で簡潔に（場合によっては一文で）まとめてください。",
        "・作業時間・分数・件数などの数値は一切含めないでください。",
        "・各項目は日本語の丁寧な文章1〜2文程度にしてください。",
        "",
        "出力する項目とその意味：",
        "・achievementStatus:「目標の達成状況」。今日の目標（下記）に対して、メモから読み取れる範囲でどこまで進んだか。",
        "・result:「目標に対しての実績」。メモに書かれた具体的な作業・出来事をそのまま要約したもの。",
        "・action:「目標達成のためのアクション」。メモに書かれた、目標達成のために実際に行った行動。",
        "・actionStatus:「アクションの実施状況」。上記actionが完了したか、途中か、持ち越しかなど。",
        "・learning:「今日の学び・気づき」。メモの中に気づき・反省・課題として書かれていた内容。メモに気づきの記述がなければ、作業内容から読み取れる範囲に留める。",
        "",
        `今日の目標：${todayGoal || "（未記入）"}`,
        `次の日の目標：${nextDayGoal || "（未記入）"}`,
        `気づきメモ（原文。これに書かれていること以外は使わない）：\n${notes || "（メモなし）"}`,
      ].join("\n"),
    });
    return NextResponse.json(object);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "AIでの文章作成に失敗しました" }, { status: 502 });
  }
}
