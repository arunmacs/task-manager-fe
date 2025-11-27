import toast from "react-hot-toast";
import type { ApiResponse, ITask } from "../../types.global";
import apiClient from "../apiClient/axiosApi";

export const taskServices = {
  getTasks: async () => {
    const { data: response } = await apiClient.get<ApiResponse<ITask[]>>(
      "/tasks"
    );

    return response.data || [];
  },

  getByTaskId: async (id: string) => {
    const { data: response } = await apiClient.get<ApiResponse<ITask>>(
      `/tasks/${id}`
    );
    if (!response.data) {
      throw new Error(response.message || "Project not found.");
    }

    return response.data;
  },

  createTask: async (payload: Partial<ITask>): Promise<ITask> => {
    try {
      const { data: response } = await apiClient.post<ApiResponse<ITask>>(
        "/tasks",
        payload
      );
      if (!response.data) {
        throw new Error(response.message || "Failed to create task.");
      }
      toast.success(response.message || "Task created successfully.");
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, failed to create task."
      );
      throw error;
    }
  },

  updateTask: async (id: string, payload: Partial<ITask>): Promise<ITask> => {
    try {
      const { data: response } = await apiClient.put<ApiResponse<ITask>>(
        `/tasks/${id}`,
        payload
      );
      if (!response.data) {
        throw new Error(response.message || "Failed to update task.");
      }
      toast.success(response.message || "Task Updated successfully.");
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, failed to update task."
      );
      throw error;
    }
  },

  deleteTask: async (ids: string[]): Promise<any> => {
    try {
      const { data: response } = await apiClient.delete<ApiResponse<any>>(
        `/tasks`,
        { data: { ids } }
      );
      if (!response.message) {
        throw new Error(response.message || "Failed to delete task.");
      }
      toast.success(response.message || "Task deleted successfully.");
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, failed to delete task."
      );
      throw error;
    }
  },
};
