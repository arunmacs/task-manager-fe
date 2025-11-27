import type React from "react";
import type { ITask } from "../../types.global";
import { Loader2, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import FormSelect from "../common/FormSelect";
import { TaskCategoryEnum, TaskStatusEnum } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskServices } from "../../lib/services/taskServices";
import FormDate from "../common/FormDate";

interface TaskModalProps {
  open: boolean;
  task?: ITask;
  onCancel: () => void;
}

const TaskModal: React.FC<TaskModalProps> = (props: TaskModalProps) => {
  const { open, task, onCancel } = props;

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<ITask>>();

  useEffect(() => {
    if (task && task?._id) {
      setFormData({ ...formData, ...task });
    }
  }, [task, open]);

  const newTaskMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...formData };
      await taskServices.createTask(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onCancel();
    },
    onError: () => {},
  });

  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      if (task && task?._id) {
        const payload = { ...formData };
        await taskServices.updateTask(task?._id, payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onCancel();
    },
    onError: () => {},
  });

  const handleInput = (value: any, field: string) => {
    console.log(field, value, typeof value);
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (task?._id) {
      updateTaskMutation.mutate();
    } else {
      newTaskMutation.mutate();
    }
  };

  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50 transition-opacity duration-200" />
          <div
            className={`
          fixed top-0 right-0 min-h-screen w-full md:w-96 bg-slate-200 z-50 shadow-2xl 
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
          >
            <div className="flex justify-between items-center border-b border-gray-500 p-4">
              <h1 className="font-semibold text-xl">Create Task</h1>
              <button
                onClick={onCancel}
                className="p-1 rounded-xs bg-white border border-transparent hover:border-gray-500"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <FormInput
                required
                label="Title"
                field="title"
                placeholder="Enter Task Title"
                value={formData?.title}
                handleChange={handleInput}
              />
              <FormTextArea
                label="Description"
                field="description"
                placeholder="Enter Task Description"
                value={formData?.description}
                handleChange={handleInput}
              />
              <FormDate
                label="Due Date"
                field="dueDate"
                placeholder="Enter Task Due Date"
                value={formData?.dueDate}
                handleChange={handleInput}
              />
              <FormSelect
                label="Category"
                field="category"
                value={formData?.category || TaskCategoryEnum.GENERAL}
                handleChange={handleInput}
                options={Object.entries(TaskCategoryEnum).map(
                  ([key, value]) => ({ label: key, value: value })
                )}
              />
              {task?._id && <FormSelect
                label="Status"
                field="status"
                value={formData?.status || TaskStatusEnum.PENDING}
                handleChange={handleInput}
                options={Object.entries(TaskStatusEnum).map(([key, value]) => ({
                  label: key,
                  value: value,
                }))}
              />}
              <div className="flex justify-around items-center mt-8">
                <button
                  type="button"
                  className="py-2 px-4 bg-white border border-transparent hover:border-gray-500"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-white border border-transparent hover:border-gray-500"
                >
                  {newTaskMutation.isPending || updateTaskMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : task && task._id ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default TaskModal;
