import "./TaskList.css";
import { useState } from "react";
import Task from "../Task/Task.jsx";
import AddTaskForm from "../AddTaskForm/AddTaskForm.jsx";
function TaskList() {
  const [isFormVisible, setIsFormVisible] = new useState(false);

    const showForm = () => {
        setIsFormVisible(true);
    };
    const hideForm = () => {
        setIsFormVisible(false);
    };

  return (
      <div className="TaskMenu-Container">
          <AddTaskForm isVisible={isFormVisible} onClose={ hideForm }></AddTaskForm>
      <div className="AddEvent">
        <button className="AddEventButton" onClick={showForm}>
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
  );
}

export default TaskList;
