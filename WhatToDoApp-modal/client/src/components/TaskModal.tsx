import { useEffect, useState } from "react";
import { Task, TaskStatusEnum } from "../models/TaskModels";
import { format } from "date-fns";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Task) => void;
  initialData?: Task;
  mode: string;
}

function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}: TaskModalProps) {
  const [taskData, setTaskData] = useState<Task>({
    name: "",
    content: "",
    startDate: null,
    endDate: null,
    status: TaskStatusEnum.new,
  });

  // Populate form fields when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTaskData(initialData);
    }
  }, [initialData, mode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value ? new Date(value) : null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl mb-4">
            {mode === "edit" ? "Edit Task" : "Create Task"}
          </h2>
          <button className="btn btn-danger" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name:</span>
            </label>
            <input
              name="name"
              value={taskData.name}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Content:</span>
            </label>
            <textarea
              name="content"
              value={taskData.content}
              onChange={handleChange}
              className="textarea textarea-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Start Date:</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={
                taskData.startDate
                  ? format(taskData.startDate, "yyyy-MM-dd")
                  : ""
              }
              onChange={handleDateChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">End Date:</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={
                taskData.endDate ? format(taskData.endDate, "yyyy-MM-dd") : ""
              }
              onChange={handleDateChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Status:</span>
            </label>
            <select
              className="select select-bordered"
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                -- Select Status --
              </option>
              {Object.values(TaskStatusEnum).map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "edit" ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
