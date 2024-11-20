import { useState } from "react";
import { Task, TaskStatusEnum } from "../models/TaskModels";
import TaskModal from "./TaskModal";
import { format } from "date-fns";

interface TaskListProps {
  taskList: Task[];
  onDeleteTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
}

const TasksList = ({ taskList, onDeleteTask, onEditTask }: TaskListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task>();

  const handleEditClick = (task: Task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const getStatusBadgeClass = (status: TaskStatusEnum) => {
    switch (status) {
      case TaskStatusEnum.new:
        return "badge badge-info"; // Blue for 'new'
      case TaskStatusEnum.inprogress:
        return "badge badge-warning"; // Yellow for 'inprogress'
      case TaskStatusEnum.done:
        return "badge badge-success"; // Green for 'done'
      default:
        return "badge badge-ghost"; // Default style
    }
  };

  return (
    <>
      <ul>
        {taskList.map((task: Task, index: number) => (
          <li
            key={index}
            className="flex justify-between items-center bg-base-200 p-4 mb-2 rounded"
          >
            <span className={getStatusBadgeClass(task.status)}></span>
            <span>{task.name}</span>
            <span>{task.content}</span>
            <span>
              {task.startDate ? format(task.startDate, "dd/MM/yyyy") : ""}
            </span>
            <span>
              {task.endDate ? format(task.endDate, "dd/MM/yyyy") : ""}
            </span>
            <button
              className="btn btn-error"
              onClick={() => onDeleteTask(task)}
            >
              Delete
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleEditClick(task)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={onEditTask}
        initialData={editTask}
        mode={"edit"}
      />
    </>
  );
};

export default TasksList;
