import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Kanban, type KanbanColumnConfig, type KanbanDragEndEvent, type KanbanItemBase } from "../components/kanban.js";

interface Task extends KanbanItemBase {
  title: string;
  assignee: string;
  priority: "low" | "medium" | "high";
}

const columns: KanbanColumnConfig[] = [
  { id: "todo", title: "To Do", color: "#6b7280" },
  { id: "in-progress", title: "In Progress", color: "#f59e0b" },
  { id: "review", title: "Review", color: "#8b5cf6" },
  { id: "done", title: "Done", color: "#22c55e" },
];

const initialTasks: Task[] = [
  { id: "1", status: "todo", title: "Set up project scaffolding", assignee: "Alice", priority: "high" },
  { id: "2", status: "todo", title: "Design database schema", assignee: "Bob", priority: "medium" },
  { id: "3", status: "todo", title: "Write API documentation", assignee: "Carol", priority: "low" },
  { id: "4", status: "in-progress", title: "Implement authentication", assignee: "Alice", priority: "high" },
  { id: "5", status: "in-progress", title: "Build dashboard UI", assignee: "Dave", priority: "medium" },
  { id: "6", status: "review", title: "Add unit tests for utils", assignee: "Bob", priority: "medium" },
  { id: "7", status: "done", title: "Configure CI/CD pipeline", assignee: "Carol", priority: "high" },
  { id: "8", status: "done", title: "Set up linting and formatting", assignee: "Dave", priority: "low" },
];

const priorityColors = {
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-sm font-medium">{task.title}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">{task.assignee}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
      </div>
    </div>
  );
}

const meta: Meta<typeof Kanban> = {
  title: "Components/Kanban",
  component: Kanban,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleDragEnd = (event: KanbanDragEndEvent<Task>) => {
      setTasks((prev) => {
        const updated = prev.map((t) => (t.id === event.item.id ? { ...t, status: event.toStatus } : t));
        return updated;
      });
    };

    return <Kanban items={tasks} columns={columns} renderCard={(task) => <TaskCard task={task} />} onDragEnd={handleDragEnd} />;
  },
};

export const WithColumnActions: Story = {
  render: () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleDragEnd = (event: KanbanDragEndEvent<Task>) => {
      setTasks((prev) => prev.map((t) => (t.id === event.item.id ? { ...t, status: event.toStatus } : t)));
    };

    return (
      <Kanban
        items={tasks}
        columns={columns}
        renderCard={(task) => <TaskCard task={task} />}
        onDragEnd={handleDragEnd}
        onColumnEdit={(id) => alert(`Edit column: ${id}`)}
        onColumnDelete={(id) => alert(`Delete column: ${id}`)}
      />
    );
  },
};

export const EmptyColumns: Story = {
  render: () => {
    return <Kanban items={[]} columns={columns} renderCard={(task: Task) => <TaskCard task={task} />} />;
  },
};

export const CustomEmptyState: Story = {
  render: () => {
    return (
      <Kanban
        items={[]}
        columns={columns}
        renderCard={(task: Task) => <TaskCard task={task} />}
        columnEmptyState={
          <div className="border-primary-300 bg-primary-50/50 dark:border-primary-700 dark:bg-primary-950/30 grid min-h-24 place-items-center rounded-lg border border-dashed">
            <p className="text-primary-500 text-sm">Drop items here</p>
          </div>
        }
      />
    );
  },
};

export const TwoColumns: Story = {
  render: () => {
    const twoColumns: KanbanColumnConfig[] = [
      { id: "open", title: "Open", color: "#3b82f6" },
      { id: "closed", title: "Closed", color: "#22c55e" },
    ];

    const items: Task[] = [
      { id: "1", status: "open", title: "Fix login bug", assignee: "Alice", priority: "high" },
      { id: "2", status: "open", title: "Update dependencies", assignee: "Bob", priority: "low" },
      { id: "3", status: "closed", title: "Add dark mode", assignee: "Carol", priority: "medium" },
    ];

    const [tasks, setTasks] = useState<Task[]>(items);

    const handleDragEnd = (event: KanbanDragEndEvent<Task>) => {
      setTasks((prev) => prev.map((t) => (t.id === event.item.id ? { ...t, status: event.toStatus } : t)));
    };

    return <Kanban items={tasks} columns={twoColumns} renderCard={(task) => <TaskCard task={task} />} onDragEnd={handleDragEnd} />;
  },
};
