export type Task = {
  id: string;
  name: string;
  order: number;
};

export type LogEntry = {
  id: string;
  taskId: string;
  taskName: string;
  startTime: string;
  endTime: string | null;
  memo?: string;
};

export type DailyGoal = {
  date: string;
  today: string;
  nextDay: string;
};

export type WorkLogData = {
  version: 1;
  tasks: Task[];
  entries: LogEntry[];
  goals: DailyGoal[];
};

export type TaskTotal = {
  taskId: string;
  taskName: string;
  minutes: number;
};
