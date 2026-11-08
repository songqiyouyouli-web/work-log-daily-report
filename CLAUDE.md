# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

MVP is implemented: recording screen (`app/page.tsx`), aggregation screen (`app/summary/page.tsx`), localStorage persistence (`lib/storage.ts`, `lib/useWorkLog.ts`), and the today/next-day goal fields are done and manually verified in-browser. Not yet done: Git init, GitHub public repo, Vercel deploy, and the write-up article. Do not re-scaffold the project — build on the existing `app/`, `components/`, `lib/` structure.

## What this app is

**作業ログ日報 (Work Log → Daily Report app)** — a second, independent project (課題2) for a Claude Code learning assignment. It must differ in theme/purpose from a prior project (課題1, a Mercari listing-text generator) — this is a time-tracking/aggregation app, not a text-generation app.

- **Who**: office workers who write a daily report (日報) at end of day.
- **Problem it solves**: remembering what you did all day and manually tallying time spent is tedious. The app records work start/stop via one-tap buttons throughout the day, then auto-aggregates at end of day into a draft report.
- **Flow**: two screens only — a recording screen (tap a task button to start it; tapping another task auto-stops the previous one) and an aggregation screen (bar/pie chart of time per task, editable log list, "copy daily report" button that generates draft report text from the aggregated data).

See `docs/requirements.md` for full functional requirements (MVP table) and `docs/assignment.md` for the meta-requirements of the assignment itself.

## Planned tech stack

| Role | Choice |
| --- | --- |
| Framework | Next.js (React) + Tailwind CSS |
| Data storage | Browser `localStorage` only — **no database, no backend persistence** |
| Charts | Recharts (or similar) |
| AI (optional "あれば良い" feature) | Same AI API as 課題1, called from a Next.js API Route so the key stays server-side |
| Deploy | Vercel |
| Source control | GitHub (public repo) |

## Hard constraints (non-negotiable per requirements.md)

- **No server-side persistence and no login.** All work records live in `localStorage` in the browser; nothing is sent to a server except an optional AI-summary call.
- **No sensitive content.** Task names are limited to generic category labels (e.g. "書類確認", "メール対応"); never store document contents or personal information in a task name or note.
- **AI API key handling**: if the optional AI summary feature is implemented, the API key must live in Vercel environment variables and be called only from a server-side API Route — never exposed to the client.
- **Public demo data must be fictional.** Any screenshots/README/article content must use made-up task names and data, not real work logs.
- **Mobile-friendly tap targets**: the recording screen's buttons must be large enough to comfortably tap on a phone.

## Workflow requirements for this repo

This is an assignment that explicitly grades *process*, not just the final app:

- Always go through **Plan Mode** (design → user confirmation → implementation) before writing feature code — do not jump straight to implementation.
- Update this CLAUDE.md with project-specific rules as they're discovered (the assignment explicitly calls for carrying lessons from 課題1 forward rather than repeating mistakes).
- The assignment also expects a GitHub public repo, a Vercel deployment, and an article covering: target user, tech stack, which Claude Code features were used, pain points hit, public URL, and GitHub URL. Keep this in mind when naming things/structuring commits, since the repo itself is part of the deliverable.

## 開発時の学び・つまずきポイント（課題1から引き継ぐ／記事用メモ）

- **localStorageのみのアプリで複数タブを同時に開くと、データが消えることがある。** 各タブが読み込んだ時点のデータをメモリに持っていて、変更のたびに丸ごと保存し直すため、片方のタブの古い状態がもう片方の新しい変更を上書きしてしまう（例：タブAで作業ボタンを追加→タブBを操作→タブBの保存でタブAの追加分が消える）。`lib/useWorkLog.ts`で`window`の`storage`イベントを監視し、他のタブでの変更を自動的に取り込むようにして解決した。同じ設計（localStorageのみ・サーバーなし）のアプリを作るときは最初からこの対策を入れておく。
- **Next.js 16（Cache Components機能が有効な場合）は、コンポーネントのレンダー中に`new Date()`や`Date.now()`を直接呼ぶと、静的プリレンダー時に`Error: ... encountered the unstable value \`new Date()\` in a Client Component`でビルドが失敗する。** 対策は「データ読み込み前（`isLoaded`がfalseの間）は日時を使う計算を一切しない」ようにガードすること。`useWorkLog.ts`の`todayEntries`/`todayGoal`、`app/summary/page.tsx`の`totals`/`reportText`はいずれも`isLoaded ? (...new Date()を使う処理...) : 空の初期値`という形にしてある。

## 説明のルール（私は初心者です）
- 作業の前に「これから何をするか」と「なぜ必要か」を1〜2文で説明する
- 作業の後に、次の3つを必ず報告する
  1. やったこと
  2. 追加・変更したファイル（ファイル名と、そのファイルの役割）
  3. 今どうなったか（画面で何が見られるか、次に何をすればいいか）
- コマンドを実行するときは、そのコマンドが何をするものか一言添える
- エラーが出たら、次の順で説明する
  1. 何が起きたか（専門用語を使わずに）
  2. 原因
  3. どう直したか、または私がやること
- 専門用語を使うときは、かっこで簡単な意味を書く（例：コンポーネント（画面の部品））
- 私が手を動かす必要がある作業は「★あなたの作業」と書いて、手順を番号付きで示す