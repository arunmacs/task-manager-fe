import type React from "react";
import type { ITask } from "../../types.global";
import { Loader2, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import FormSelect from "../common/FormSelect";
import FormDate from "../common/FormDate";
import { TaskCategoryEnum, TaskStatusEnum } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskServices } from "../../lib/services/taskServices";

interface TaskModalProps {
  open: boolean;
  task?: ITask;
  onCancel: () => void;
}

const TaskModal: React.FC<TaskModalProps> = (props: TaskModalProps) => {
  const { open, task, onCancel } = props;

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<ITask>>({
    category: TaskCategoryEnum.GENERAL,
    status: TaskStatusEnum.PENDING,
  });

  useEffect(() => {
    if (task && task._id) {
      setFormData(task);
    } else {
      setFormData({
        category: TaskCategoryEnum.GENERAL,
        status: TaskStatusEnum.PENDING,
      });
    }
  }, [task, open]);

  const newTaskMutation = useMutation({
    mutationFn: async () => taskServices.createTask({ ...formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onCancel();
    },
    onError: (error) => console.error("Error creating task:", error),
  });

  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      if (task?._id) {
        await taskServices.updateTask(task._id, { ...formData });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onCancel();
    },
    onError: (error) => console.error("Error updating task:", error),
  });

  const handleInput = (value: any, field: string) => {
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

  const isLoading = newTaskMutation.isPending || updateTaskMutation.isPending;
  const submitButtonText = task?._id ? "Update Task" : "Create Task";
  const modalTitle = task?._id ? "Edit Task" : "Create New Task";

  return (
    <>
      {open && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={onCancel}
          />
          
          {/* Modal Sidebar */}
          <div
            className={`
              fixed top-0 right-0 h-full w-full xs:w-80 sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto
              transform transition-transform duration-300 ease-in-out
              ${open ? "translate-x-0" : "translate-x-full"}
            `}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white z-10">
              <h1 className="font-semibold text-xl text-gray-800">{modalTitle}</h1>
              <button
                onClick={onCancel}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition duration-150"
                aria-label="Close modal"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form Body with consistent spacing */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <FormInput
                required
                label="Title"
                field="title"
                placeholder="Enter Task Title"
                value={formData?.title || ""}
                handleChange={handleInput}
                // Note: These classes are a hint for your FormInput component implementation
                className="border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500" 
              />
              <FormTextArea
                label="Description"
                field="description"
                placeholder="Enter Task Description"
                value={formData?.description || ""}
                handleChange={handleInput}
                className="border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              />
              <FormDate
                label="Due Date"
                field="dueDate"
                placeholder="Enter Task Due Date"
                value={formData?.dueDate || undefined}
                handleChange={handleInput}
                className="border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              />
              <FormSelect
                label="Category"
                field="category"
                value={formData?.category || TaskCategoryEnum.GENERAL}
                handleChange={handleInput}
                options={Object.entries(TaskCategoryEnum).map(([key, value]) => ({ label: key, value: value }))}
                className="border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              />
              
              {task?._id && (
                <FormSelect
                  label="Status"
                  field="status"
                  value={formData?.status || TaskStatusEnum.PENDING}
                  handleChange={handleInput}
                  options={Object.entries(TaskStatusEnum).map(([key, value]) => ({ label: key, value: value }))}
                  className="border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                />
              )}
              
              {/* Form Actions (Buttons) */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  className="py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition duration-150 shadow-sm"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    submitButtonText
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
