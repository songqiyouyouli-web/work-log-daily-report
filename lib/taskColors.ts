const TASK_COLORS = [
  "#9a6a76", // dusty rose
  "#a2735e", // terracotta
  "#6b8576", // sage
  "#88765f", // mocha
  "#5a7389", // dusty blue
  "#9a8655", // mustard
];

export function taskColor(index: number): string {
  return TASK_COLORS[index % TASK_COLORS.length];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function contrastingTextColor(hex: string): string {
  const l = relativeLuminance(hex);
  const whiteContrast = 1.05 / (l + 0.05);
  const blackContrast = (l + 0.05) / 0.05;
  return whiteContrast >= blackContrast ? "#ffffff" : "#171717";
}
