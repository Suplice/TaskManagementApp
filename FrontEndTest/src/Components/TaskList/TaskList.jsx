import "./TaskList.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Task from "../Task/Task.jsx";
import AddTaskForm from "../AddTaskForm/AddTaskForm.jsx";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar.jsx";
function TaskList() {
  const [isFormVisible, setIsFormVisible] = new useState(false);

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNotCompleted, setIsNotCompleted] = useState(false);
  const [isOverDue, setIsOverDue] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [filterTaskId, setFilterTaskId] = useState(0);
  const [searchTasks, setSearchTasks] = useState(false);
  const [searchTasksById, setSearchTasksById] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    function filterTasks() {
      var filteredTasks = tasks;

      if (searchText) {
        filteredTasks = filteredTasks.filter((task) =>
          task.title.toLowerCase().includes(searchText.toLowerCase()),
        );
      } else {
        filteredTasks = tasks;
      }

      if (isCompleted) {
        filteredTasks = filteredTasks.filter((task) => task.isCompleted);
      }

      if (isNotCompleted) {
        filteredTasks = filteredTasks.filter((task) => !task.isCompleted);
      }

      if (isOverDue) {
        filteredTasks = filteredTasks.filter(
          (task) => new Date(task.dueDate) < new Date() && !task.isCompleted,
        );
      }
      if (showAllTasks) {
        filteredTasks = tasks;
      }

      setFilteredTasks(filteredTasks);
    }

    filterTasks();
  }, [
    isCompleted,
    isNotCompleted,
    isOverDue,
    tasks,
    searchText,
    showAllTasks,
    searchTasks,
  ]);

  useEffect(() => {
    function filterTaskById() {
      setFilteredTasks(tasks.filter((task) => task.taskId === filterTaskId));
      clearAllFilters();
    }

    filterTaskById();
  }, [filterTaskId, searchTasksById]);

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
  };

  const setTasksByTitle = (text) => {
    setShowAllTasks(false);
    setSearchText(text);
    setSearchTasks(!searchTasks);
  };

  const setFilteredTaskId = (task) => {
    clearAllFilters();
    setFilterTaskId(task.taskId);
    setSearchTasksById(!searchTasksById);
  };

  const showTasks = () => {
    setShowAllTasks(true);
    setIsCompleted(false);
    setIsNotCompleted(false);
    setIsOverDue(false);
    setSearchTasks(!searchTasks);
  };

  const clearAllFilters = () => {
    setShowAllTasks(false);
    setIsCompleted(false);
    setIsNotCompleted(false);
    setIsOverDue(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const listTasks = filteredTasks.map((task) => (
    <Task key={task.taskId} task={task} onTaskUpdated={fetchTasks}></Task>
  ));

  return (
    <div className="MainContainer">
      <SearchBar
        onSearch={setTasksByTitle}
        tasks={tasks}
        onSearchSelectTask={setFilteredTaskId}
        onShowAllTasks={showTasks}
      ></SearchBar>
      <div className="TaskMenu-Container">
        {isFormVisible && <div className="Overlay" onClick={hideForm}></div>}
        <AddTaskForm
          isVisible={isFormVisible}
          onClose={hideForm}
          onAdded={fetchTasks}
        ></AddTaskForm>
        <div className="Controls">
          <div>
            <button className="BlankButton">Add TEST</button>
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
            <div
              ref={dropdownRef}
              className={`DropdownContent ${isDropdownVisible ? "show" : ""}`}
            >
              <img
                src="/public/removeSearchIcon.jpg"
                id="exitFilterButton"
                onClick={toggleDropdown}
              ></img>
              <label>
                <input
                  type="radio"
                  checked={showAllTasks}
                  onChange={() => {
                    setShowAllTasks(true);
                    setIsCompleted(false);
                    setIsNotCompleted(false);
                    setIsOverDue(false);
                  }}
                  name="taskFilter"
                  id="All"
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  checked={isCompleted}
                  onChange={() => {
                    setShowAllTasks(false);
                    setIsCompleted(true);
                    setIsNotCompleted(false);
                    setIsOverDue(false);
                  }}
                  name="taskFilter"
                  id="completed"
                />
                Completed
              </label>
              <label>
                <input
                  type="radio"
                  checked={isNotCompleted}
                  onChange={() => {
                    setShowAllTasks(false);
                    setIsCompleted(false);
                    setIsNotCompleted(true);
                    setIsOverDue(false);
                  }}
                  name="taskFilter"
                  id="notCompleted"
                />
                Not Completed
              </label>
              <label>
                <input
                  type="radio"
                  checked={isOverDue}
                  onChange={() => {
                    setShowAllTasks(false);
                    setIsCompleted(false);
                    setIsNotCompleted(false);
                    setIsOverDue(true);
                  }}
                  name="taskFilter"
                  id="Overdue"
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
