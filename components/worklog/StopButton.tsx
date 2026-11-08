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
      className="min-h-16 w-full rounded-xl border-2 border-red-400 text-lg font-semibold text-red-500 touch-manipulation disabled:opacity-40 dark:border-red-500 dark:text-red-400"
    >
      停止
    </button>
  );
}
