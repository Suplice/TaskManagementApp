import "./TaskList.css";
import { useState, useEffect } from "react";
import Task from "../Task/Task.jsx";
import AddTaskForm from "../AddTaskForm/AddTaskForm.jsx";
import axios from 'axios';
function TaskList() {

  const [isFormVisible, setIsFormVisible] = new useState(false);

  const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {


        try {
            const token = localStorage.getItem("JwtToken");
            console.log(token);
            const response = await axios.get("http://localhost:5065/Task/GetAllTasksByUserId", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data.data);
            setTasks(response.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const listTasks = tasks.map((task) =>
        <Task key={task.taskId} title={task.title} description={task.description} isCompleted={task.isCompleted} startDate={task.startDate} dueDate={task.dueDate} ></Task>
    );

  const showForm = () => {
    setIsFormVisible(true);
  };
  const hideForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="MainContainer">
      <div className="TaskMenu-Container">
        {isFormVisible && <div className="Overlay" onClick={hideForm}></div>}
        <AddTaskForm isVisible={isFormVisible} onClose={hideForm}></AddTaskForm>
        <div className="AddEvent">
          <button className="AddEventButton" onClick={showForm}>
            Add Task
        </button>
        </div>
        <div className="Tasks">
          {listTasks }
        </div>
      </div>
    </div>
  );
}

export default TaskList;
