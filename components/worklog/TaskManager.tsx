"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";

type Props = {
  tasks: Task[];
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

export function TaskManager({ tasks, onAdd, onRename, onDelete }: Props) {
  const [newName, setNewName] = useState("");

  function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    onAdd(name);
    setNewName("");
  }

  return (
    <details className="rounded-xl border border-black/10 p-4 dark:border-white/10">
      <summary className="cursor-pointer font-semibold">作業の管理</summary>
      <div className="mt-4 flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-2">
            <input
              type="text"
              value={task.name}
              onChange={(e) => onRename(task.id, e.target.value)}
              className="flex-1 rounded-lg border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-black"
            />
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-lg border border-black/10 px-3 py-2 text-sm text-red-500 dark:border-white/10"
            >
              削除
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="新しい作業名"
            className="flex-1 rounded-lg border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-black"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg bg-foreground px-3 py-2 text-sm text-background"
          >
            追加
          </button>
        </div>
      </div>
    </details>
  );
}
