import "./TaskList.css";
import { useState, useEffect } from "react";
import Task from "../Task/Task.jsx";
import AddTaskForm from "../AddTaskForm/AddTaskForm.jsx";
import axios from "axios";
function TaskList() {
    const [isFormVisible, setIsFormVisible] = new useState(false);

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isNotCompleted, setIsNotCompleted] = useState(false);
    const [isOverDue, setIsOverDue] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    useEffect(() => {
     fetchTasks();
    }, []);



    useEffect(() => {
        function filterTasks() {
            var filteredTasks = tasks;

            if (isCompleted) {
                filteredTasks = filteredTasks.filter(task => task.isCompleted);
            }

            if (isNotCompleted) {
                filteredTasks = filteredTasks.filter(task => !task.isCompleted);
            }

            if (isOverDue) {
                filteredTasks = filteredTasks.filter(task => new Date(task.dueDate) < new Date());
            }

            setFilteredTasks(filteredTasks);
        }


        filterTasks();
    }, [isCompleted, isNotCompleted, isOverDue, tasks]);




  async function fetchTasks() {
    try {
      const token = localStorage.getItem("JwtToken");
      const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/Task/GetAllTasksByUserId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks(response.data.data);
    } catch (error) {
        alert("An error occured while trying to fetch tasks");
    }
    }



  const showForm = () => {
    setIsFormVisible(true);
  };
  const hideForm = () => {
    setIsFormVisible(false);
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const listTasks = filteredTasks.map((task) => (
        <Task
            key={task.taskId}
            task={task}
            onTaskUpdated={fetchTasks}
        ></Task>
    ));

  return (
        <div className="MainContainer">
            <div className="TaskMenu-Container">
                {isFormVisible && <div className="Overlay" onClick={hideForm}></div>}
                <AddTaskForm isVisible={isFormVisible} onClose={hideForm} onAdded={fetchTasks}></AddTaskForm>
              <div className="Controls">
                  <div>
                      <button className="BlankButton">
                          Add Task
                      </button>
                  </div>
                  <div>
                    <button className="AddEventButton" onClick={showForm}>
                        Add Task
                      </button>
                  </div>
                    <div>
                        <button className="FilterButton" onClick={toggleDropdown}>
                            Filter Tasks
                      </button>
                    </div>
                        {isDropdownVisible && (
                          <div className={`DropdownContent ${isDropdownVisible ? 'show' : ''}`}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isCompleted}
                                        onChange={() => setIsCompleted(!isCompleted)}
                                    />
                                    Completed
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isNotCompleted}
                                        onChange={() => setIsNotCompleted(!isNotCompleted)}
                                    />
                                    Not Completed
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isOverDue}
                                        onChange={() => setIsOverDue(!isOverDue)}
                                    />
                                    Overdue
                                </label>
                            </div>
                        )}

              </div>
                <div className="Tasks">{listTasks}</div>
            </div>
        </div>
    );
}

export default TaskList;
