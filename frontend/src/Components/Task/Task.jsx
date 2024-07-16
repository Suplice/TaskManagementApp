import "./Task.css";

function Task() {
  return (
    <div className="Task-container">
      <div className="TaskInformation">
        <div className="TaskTitle">Title</div>
        <div className="TaskDescription">Description</div>
        <div className="TaskStartTime">Start Time: </div>
        <div className="TaskEndTime">End Time: </div>
        <div className="TaskCompletionStatus">Completed: </div>
      </div>
      <div className="TaskButtons">
        <button className="CompleteTaskButton"> Complete </button>
        <button className="RemoveTaskButton">Remove</button>
      </div>
    </div>
  );
}

export default Task;
