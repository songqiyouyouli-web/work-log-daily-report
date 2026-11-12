"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function MemoField({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">気づきメモ</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="今の作業で気づいたことを一言メモ"
        rows={2}
        className="w-full rounded-lg border border-black/10 p-3 text-sm dark:border-white/10 dark:bg-black"
      />
    </div>
  );
}
