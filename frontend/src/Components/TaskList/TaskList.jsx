import "./TaskList.css";
import { useState, useEffect } from "react";
import Task from "../Task/Task.jsx";
import AddTaskForm from "../AddTaskForm/AddTaskForm.jsx";
import axios from 'axios';
function TaskList() {

  const [isFormVisible, setIsFormVisible] = new useState(false);

  const [tasks, setTasks] = useState([]);







    async function fetchTasks() {


        try {
            const token = localStorage.getItem("JwtToken");
            console.log(token);
            const response = await axios.get("http://localhost:5065/Task/GetAllTasksByUserId", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }

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
            Add Event
        </button>
                  <button className="AddEventButton" onClick={fetchTasks}>
                      Add Event
                  </button>
        </div>
        <div className="Tasks">
          <Task>events</Task>
          <Task>events</Task>
          <Task>events</Task>
          <Task>events</Task>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
