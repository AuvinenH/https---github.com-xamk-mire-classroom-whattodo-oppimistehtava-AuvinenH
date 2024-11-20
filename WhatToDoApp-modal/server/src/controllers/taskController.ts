import { Request, Response } from "express";
import Task from "../models/taskModel";

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error: unknown) {
    res.status(500).json({ message: "Could not get tasks from db" });
  }
};

// Create new task
export const createTask = async (req: Request, res: Response) => {
  const { name, content, startDate, endDate } = req.body;

  try {
    const task = new Task({ name, content, startDate, endDate });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error: unknown) {
    res.status(500).json({ message: "Could not create a new task" });
  }
};

// Delete existing task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id); // Delete task by id

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" }); // Task cannot be found by id
    } else {
      res
        .status(200)
        .json({ message: "Task deleted successfully", task: deletedTask });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not delete task" });
  }
};

// Update existing task by id
export const editTask = async (req: Request, res: Response) => {
  const { _id, name, content, startDate, endDate, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        name,
        content,
        startDate,
        endDate,
        status,
      },
      {
        new: true, // Returns updated document
        runValidators: true, // Runs validation
      }
    );

    // If task cannot be found by id
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(201).json(updatedTask);
    }
  } catch (error: unknown) {
    // If updating fails
    res.status(500).json({ message: "Could not update task" });
  }
};
