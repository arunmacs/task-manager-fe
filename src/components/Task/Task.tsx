import React from "react";
// Assuming getStatusProps and getCategoryProps are available and return the Icon components and colors
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

  const cardClasses = `
    group p-4 bg-white rounded-xs shadow-sm transition duration-150 ease-in-out cursor-pointer flex
    ${
      isSelected
        ? "border-2 border-blue-500/60"
        : "border-2 border-transparent hover:border-slate-400"
    }
  `;

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); 
    task?._id && onToggleSelect(task._id);
  };

  return (
    <div className={cardClasses}>
      {/* Checkbox Column */}
      <div className="mr-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxClick}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
      </div>

      {/* Main Content Area (Clickable for main action/detail view) */}
      <div onClick={onClick} className="grow min-w-0">
        <div className="flex justify-between items-center mb-3">
          <span
            className="px-2 py-0.5 text-xs font-semibold rounded-xs text-white flex items-center"
            style={{ backgroundColor: categoryProps.color }}
          >
            <CategoryIcon className="mr-1" size={10} />
            {categoryProps.text}
          </span>

          <span style={{ color: statusProps.color }} title={statusProps.text}>
            <StatusIcon size={16} />
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-1">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-500 mb-3 truncate">
            {task.description}
          </p>
        )}

        <div
          className={`text-xs text-gray-400 ${
            isPastDue ? "text-red-500 font-medium" : ""
          }`}
        >
          Due Date:{"  "}📅{" "}
          {dueDate
            ? dueDate.toDateString() + " " + dueDate.toLocaleTimeString()
            : "No due date"}
        </div>
      </div>

      {/* Action Buttons Column */}
      <div className="flex flex-col justify-between items-center ml-4 gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            task?._id && handleDelete(task?._id);
          }}
          className="p-1 rounded-sm border-2 border-transparent hover:border-red-500 text-red-400 hover:text-red-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Delete Task"
        >
          <Trash2Icon className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(task);
          }}
          className="p-1 rounded-sm border-2 border-transparent hover:border-slate-500 text-slate-400 hover:text-slate-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500"
          title="Edit Task"
        >
          <Edit2Icon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
