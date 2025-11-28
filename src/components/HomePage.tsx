import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  Loader2,
  Trash2Icon,
} from "lucide-react";
import Task from "./Task/Task";
import { useMutation, useQuery } from "@tanstack/react-query";
import { taskServices } from "../lib/services/taskServices";
import { useState } from "react";
import TaskModal from "./Task/TaskModal";
import type { ITask } from "../types.global";

const HomePage: React.FC = () => {
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();
  const [selectedTaskList, setSelectedTaskList] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);

  const {
    data: tasks,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskServices.getTasks(),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const payload = ids;
      await taskServices.deleteTask(payload);
    },
    onSuccess: () => {
      setSelectedTaskList([]);
      refetch();
    },
    onError: () => {},
  });

  const handleToggleSelection = (id: string) => {
    const isSelectedTaskId = selectedTaskList?.includes(id);

    if (isSelectedTaskId) {
      setSelectedTaskList((prev) => prev.filter((taskId) => taskId !== id));
    } else {
      setSelectedTaskList((prev) => [...prev, id]);
    }
  };

  const handleToggleSelectAll = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event?.target?.checked;
    setIsSelectedAll((prev) => (prev === true ? false : true));
    setSelectedTaskList((prev) => {
      if (value) {
        const ids = (tasks || [])
          .map((task) => task._id)
          .filter((id): id is string => typeof id === "string");
        return Array.from(new Set([...prev, ...ids]));
      } else {
        return [];
      }
    });
  };

  return (
    <>
      <div className="grid gap-6 sm:p-2 md:p-4">
        {/* Header Section: Welcome Title & Actions */}
        <div className="border-b-2 border-white flex flex-col md:flex-row justify-between items-center pb-4 gap-4 md:gap-0">
          <div
            id="welcome user title"
            className="text-center md:text-left w-full md:w-auto"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-slate-600">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-indigo-500 via-sky-500 to-green-400 text-transparent bg-clip-text">
                User
              </span>
            </h1>
          </div>
          <div id="actions" className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-500 bg-white p-3 rounded-xs shadow-sm transition duration-150 order-2 md:order-1"
              onClick={() => {
                setSelectedTask(undefined);
                setOpenTaskModal(true);
              }}
            >
              <PlusIcon className="w-5 h-5 text-gray-800" />
              Task
            </button>
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-500 bg-white p-3 rounded-xs shadow-sm transition duration-150 order-1 md:order-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => {
                deleteTaskMutation.mutate(selectedTaskList);
              }}
              disabled={selectedTaskList?.length === 0}
            >
              <Trash2Icon className="w-5 h-5 text-red-500" />
              Delete All
            </button>
          </div>
        </div>

        {/* Select All & Filters Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
          <div className="inline-flex items-center gap-3 w-full sm:w-auto">
            <input
              id="select-all"
              type="checkbox"
              checked={isSelectedAll}
              onChange={handleToggleSelectAll}
              className="w-5 h-5 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium text-gray-700"
            >
              Select All
            </label>
          </div>
          <div id="filters" className="w-full sm:w-auto flex justify-end gap-4">
            <div className="relative flex items-center bg-white border border-gray-300 rounded-xs p-2 hover:border-gray-500 w-full sm:w-64">
              <SearchIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                placeholder="Search tasks..."
                className="outline-none border-none text-sm w-full focus:ring-0"
              />
              {/* <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> */}
            </div>
            <button className="p-2.5 bg-white border border-gray-300 hover:border-gray-500 rounded-xs shadow-sm">
              <FilterIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Tasks Display Area */}
        <div id="main-sub-tasks" className="w-full">
          {isFetching ? (
            <div className="w-full h-52 flex justify-center items-center">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div
              id="tasks"
              // Responsive Grid: 1 col mobile, 2 cols small screens, 3 cols medium, 4 cols large
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {(tasks || [])?.map((task) => (
                <Task
                  key={task._id} // Added key for list rendering best practice
                  task={task as any}
                  handleEdit={(task: ITask) => {
                    setSelectedTask(task);
                    setOpenTaskModal(true);
                  }}
                  handleDelete={(id: string) => {
                    deleteTaskMutation.mutate([id]);
                  }}
                  isSelected={selectedTaskList?.includes(task?._id!)}
                  onToggleSelect={handleToggleSelection}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {openTaskModal && (
        <TaskModal
          open={openTaskModal}
          task={selectedTask}
          onCancel={() => {
            setSelectedTask(undefined);
            setOpenTaskModal(false);
            refetch();
          }}
        />
      )}
    </>
  );
};

export default HomePage;
