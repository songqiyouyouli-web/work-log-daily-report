const TASK_COLORS = [
  "#2a78d6", // blue
  "#1baf7a", // aqua
  "#eda100", // yellow
  "#008300", // green
  "#4a3aa7", // violet
  "#e34948", // red
  "#e87ba4", // magenta
  "#eb6834", // orange
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
