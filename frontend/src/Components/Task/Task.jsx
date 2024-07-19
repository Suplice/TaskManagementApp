import "./Task.css";

function Task({ title, description, isCompleted, startDate, dueDate }) {

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDay()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}`;
    };

  return (
    <div className="Task-container">
      <div className="TaskInformation">
              <div className="TaskTitle">Title: {title}</div>
              <div className="TaskDescription">Description: {description} </div>
              <div className="TaskStartTime">Start Time: {formatDate(startDate)}</div>
              <div className="TaskEndTime">End Time: {formatDate(dueDate)}</div>
              <div className="TaskCompletionStatus">Completed: { isCompleted ? "yes" : "no"}</div>
      </div>
      <div className="TaskButtons">
        <button className="CompleteTaskButton"> Complete </button>
        <button className="RemoveTaskButton">Remove</button>
      </div>
    </div>
  );
}

export default Task;
