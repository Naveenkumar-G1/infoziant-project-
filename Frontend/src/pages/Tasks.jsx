import { useEffect, useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { createTask, getTasks } from "../services/taskService";

const emptyTask = {
  title: "",
  description: "",
  dueDate: "",
  status: "Open",
};

const Tasks = () => {
  useAuthRedirect();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyTask);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setMessage("Failed to load tasks.");
      }
    };

    loadTasks();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const task = await createTask(form);
      setTasks([task, ...tasks]);
      setForm(emptyTask);
      setMessage("Task added successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Tasks</h1>
          <p>Track follow-ups, meetings, and sales tasks in one place.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-form">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Task"}
        </button>
      </form>

      {message && <p className="error">{message}</p>}

      <div className="lead-list">
        {tasks.map((task) => (
          <div key={task._id} className="lead-card">
            <div>
              <strong>{task.title}</strong>
              <p>{task.description || "No description"}</p>
              <p>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </p>
            </div>
            <span className="status-pill">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
