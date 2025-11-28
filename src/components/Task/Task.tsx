import React from "react";
import { getStatusProps, getCategoryProps } from "../../utils/helper";
import type { ITask } from "../../types.global";
import { Edit2Icon, Trash2Icon } from "lucide-react";

interface TaskCardProps {
  task: ITask;
  onClick?: () => void;
  handleEdit: (task: ITask) => void;
  handleDelete: (id: string) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  handleEdit,
  handleDelete,
  isSelected,
  onToggleSelect,
}: TaskCardProps) => {
  const statusProps = getStatusProps(task.status);
  const categoryProps = getCategoryProps(task.category);

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isPastDue = dueDate ? dueDate < new Date() : false;

  const StatusIcon = statusProps.Icon;
  const CategoryIcon = categoryProps.Icon;

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    task?._id && onToggleSelect(task._id);
  };

  const cardClasses = `
    group p-4 bg-white rounded-sm shadow-sm transition duration-300 ease-in-out cursor-pointer flex items-start 
    ${
      isSelected
        ? "border-2 border-indigo-400 shadow-md"
        : "border-2 border-transparent hover:border-slate-300"
    }
  `;

  return (
    <div className={cardClasses}>
      {/* Checkbox Column */}
      <div className="mr-3 mt-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxClick}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
          aria-label={`Select task: ${task.title}`}
        />
      </div>

      {/* Main Content Area */}
      <div onClick={onClick} className="grow min-w-0">
        <div className="flex justify-between items-center mb-3">
          {/* Category Tag */}
          <span
            className="px-2.5 py-1 text-xs font-semibold rounded-full text-white flex items-center shadow-sm"
            style={{ backgroundColor: categoryProps.color }}
          >
            <CategoryIcon className="mr-1.5 w-3 h-3" />
            {categoryProps.text}
          </span>

          {/* Status Icon */}
          <span style={{ color: statusProps.color }} title={statusProps.text}>
            <StatusIcon size={18} />
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-800 mb-1 leading-snug">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-500 mb-3 truncate">
            {task.description}
          </p>
        )}

        {/* Due Date Info*/}
        <div
          className={`text-xs text-gray-500 flex items-center gap-1 ${
            isPastDue ? "text-red-600 font-semibold" : ""
          }`}
        >
          📅 Due:{" "}
          {dueDate
            ? `${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )}`
            : "No due date"}
        </div>
      </div>

      {/* Action Buttons Column */}
      <div className="flex flex-col items-center ml-4 gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            task?._id && handleDelete(task?._id);
          }}
          className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          title="Delete Task"
          aria-label="Delete Task"
        >
          <Trash2Icon className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(task);
          }}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
          title="Edit Task"
          aria-label="Edit Task"
        >
          <Edit2Icon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
