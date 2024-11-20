import { Router } from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
} from "../controllers/taskController";

const router = Router();

// Route for fetching all tasks
router.get("/tasks", getTasks);

// Route for creating a new task
router.post("/tasks", createTask);

// Route for task deletion
router.delete("/tasks/:id", deleteTask);

// Route for updating existing task
router.put("/tasks", editTask);

export default router;
