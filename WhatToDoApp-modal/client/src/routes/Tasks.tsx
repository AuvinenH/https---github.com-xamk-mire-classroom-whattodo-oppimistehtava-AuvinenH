import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import {
  createTaskApi,
  deleteTaskApi,
  editTaskApi,
  getTasksApi,
} from "../services/apiService";
import { Task } from "../models/TaskModels";
import CreateTask from "../components/CreateTask";

const Tasks = () => {
  const [message, setMessage] = useState<string>("");

  const [taskList, setTaskList] = useState<Task[]>([]);

  // Lataus muuttuja, jonka avulla voidaan piillottaa tehtävälista tarvittaessa
  const [loading, setLoading] = useState<boolean>(true);

  // Virhe muuttuja jonka avulla voidaan ilmaista, mikäli api-kutsu ei onnistunut
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kutsutaan erillistä API-kutsufunktiota
    getTasks();
  }, []);

  const getTasks = async () => {
    getTasksApi()
      .then((data) => {
        setTaskList(data); // Asetetaan uusi arvo taskList:lle
      })
      .catch((error) => {
        setError(error.message); // Asetetaan virheviesti
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle task deletion
  const handleDeleteTask = async (task: Task) => {
    if (task._id) {
      setLoading(true);
      await deleteTaskApi(task._id)
        .then(() => {
          setMessage("Task was deleted");
          getTasks();
        })
        .catch((error) => {
          setError(error.message); // Asetetaan virheviesti
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleEditTask = (task: Task) => {
    setLoading(true);
    editTaskApi(task)
      .then((data: Task) => {
        console.log("Task updated", data);
        setMessage("Task was updated");
        getTasks();
      })
      .catch((error) => {
        setError(error.message); // Asetetaan virheviesti
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateTask = (task: Task) => {
    setLoading(true);
    createTaskApi(task)
      .then((newTask: Task) => {
        console.log("Created new task", newTask.name);
        setMessage("Created new task: " + newTask.name);
        getTasks();
      })
      .catch((error) => {
        setError(error.message); // Asetetaan virheviesti
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-4">Tasks</h2>
      <div className="card shadow-lg rounded-lg p-4 bg-primary-content">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <TaskList
              taskList={taskList}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </div>
        )}
        <div className="flex mb-4">
          <CreateTask onCreateTask={handleCreateTask} />
        </div>
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {message && (
          <p className="mt-4 text-center text-lg font-medium text-green-600">
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default Tasks;
