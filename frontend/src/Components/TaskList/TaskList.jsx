import "./TaskList.css";
import Task from "../Task/Task.jsx";
function TaskList() {




  return (
      <div className="TaskMenu-Container">
          <div className="AddEvent">
          <button className="AddEventButton">Add Event</button>
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