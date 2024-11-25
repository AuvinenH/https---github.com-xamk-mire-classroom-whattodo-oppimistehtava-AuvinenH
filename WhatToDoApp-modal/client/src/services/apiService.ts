import axios, { AxiosError, AxiosResponse } from "axios";
import { Task } from "../models/TaskModels";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Osoita backendisi URL tähän
  timeout: 5000, // Aseta aikakatkaisu 5 sekuntia
});

export const getTasksApi = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse = await apiClient.get("/tasks");
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error fetching message: ${err.response?.data}`);
  }
};

export const createTaskApi = async (newTask: Task): Promise<Task> => {
  try {
    const response: AxiosResponse = await apiClient.post("/tasks", newTask);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error fetching message: ${err.response?.data}`);
  }
};

export const deleteTaskApi = async (taskId: string): Promise<void> => {
  const response: AxiosResponse = await apiClient.delete(`/tasks/${taskId}`);
  return response.data;
};

export const editTaskApi = async (task: Task): Promise<Task> => {
  const response: AxiosResponse = await apiClient.put("/tasks", task);
  return response.data;
};
