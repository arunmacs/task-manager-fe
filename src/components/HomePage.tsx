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

  return (
    <>
      <div className="grid grid-rows-[0.5fr_0.1fr_0.25fr] gap-6">
        <div className="border-b-2 border-white pb-6 md:pb-2 grid grid-rows-[0.5fr_0.5fr] md:grid-cols-[1.5fr_0.5fr]">
          <div id="welcome user title">
            <h1 className="text-lg font-bold text-slate-600 text-center mb-6 md:mb-0 md:text-left">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-indigo-500 via-sky-500 to-green-400 text-transparent bg-clip-text">
                User
              </span>
            </h1>
          </div>
          <div
            id="actions"
            className="grid grid-cols-2 md:grid-cols-2 place-content-between gap-6"
          >
            <button
              className="flex items-center gap-1 border border-transparent hover:border-gray-500 bg-white p-2 order-2 md:order-1"
              onClick={() => {
                setSelectedTask(undefined);
                setOpenTaskModal(true);
              }}
            >
              <PlusIcon className="w-4 h-4 text-gray-800" />
              Task
            </button>
            <button
              className="flex items-center gap-1 border border-transparent hover:border-gray-500 bg-white p-2 order-1 md:order-2 disabled:bg-gray-300"
              onClick={() => {
                deleteTaskMutation.mutate(selectedTaskList);
              }}
              disabled={selectedTaskList?.length === 0}
            >
              <Trash2Icon className="w-4 h-4 text-red-500" />
              Delete All
            </button>
          </div>
        </div>
        <div
          id="filters"
          className="w-full grid grid-cols-[1.5fr__0.25fr] md:grid-cols-[0.25fr_auto] place-items-center justify-end gap-4"
        >
          {/* Filters - Later Implementation */}
          <button className="rounded-xs p-2 flex items-center gap-2 w-full bg-white border border-transparent hover:border-gray-500">
            <SearchIcon className="w-6 h-6" />
            <input
              placeholder="Search"
              className="outline-none border-none text-base w-full"
            />
            {/* <Loader2 className="w-6 h-6 animate-spin" /> */}
          </button>
          <button className="p-2.5 bg-white border border-transparent hover:border-gray-500">
            <FilterIcon className="w-5 h-5" />
          </button>
        </div>
        <div id="main-sub-tasks" className="w-full">
          {isFetching ? (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            <div
              id="tasks"
              className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {(tasks || [])?.map((task) => (
                <Task
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
