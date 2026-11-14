"use client";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function GoalField({ label, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-[#2e2b28]">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full rounded-lg border border-black/10 p-3 text-sm"
      />
    </div>
  );
}
