"use client";

type Props = {
  disabled: boolean;
  onStop: () => void;
};

export function StopButton({ disabled, onStop }: Props) {
  return (
    <button
      type="button"
      onClick={onStop}
      disabled={disabled}
      className="min-h-16 w-full rounded-2xl border-2 border-red-400 bg-[#fbfaf7] text-lg font-semibold text-red-500 shadow-sm touch-manipulation disabled:opacity-40"
    >
      停止
    </button>
  );
}
