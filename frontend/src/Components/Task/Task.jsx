import "./Task.css";
import axios from 'axios';
import { useState } from 'react';

function Task({ task, onTaskUpdated }) {

    let [taskState, setTaskState] = useState(task);

    let { taskId, title, description, isCompleted, startDate, dueDate } = task;


  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDay()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

    async function handleCompleteTask() {
        if (isCompleted) {
            alert("Task is already completed");
        }
        else {
            const token = localStorage.getItem("JwtToken");
            const updatedTask = { ...taskState, isCompleted: true };


            try {
                const response = await axios.post("http://localhost:5065/Task/update",  updatedTask , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                if (response.status === 200) {
                    setTaskState(updatedTask);
                    onTaskUpdated();
                }
                else {
                    alert("an error occured while trying to complete task");
                }
            }
            catch (error)
            {
                alert("error occured while trying to send request");
            }
        }
    }

    async function handleRemoveTask() {
        const token = localStorage.getItem("JwtToken");

        try {
            const response = await axios.post("http://localhost:5065/Task/delete", taskState, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })



            if (response.status === 200) {
                console.log(response);
                onTaskUpdated();
            }
            else{
                alert("error occured while trying to remove task");
            }
        }
        catch (error) {
            alert("error occured while trying to send request");
        }
    }

  return (
    <div className="Task-container">
      <div className="TaskInformation">
        <div className="TaskTitle">Title: {title}</div>
        <div className="TaskDescription">Description: {description} </div>
        <div className="TaskStartTime">Start Time: {formatDate(startDate)}</div>
        <div className="TaskEndTime">End Time: {formatDate(dueDate)}</div>
        <div className="TaskCompletionStatus">
          Completed: {isCompleted ? "yes" : "no"}
        </div>
      </div>
      <div className="TaskButtons">
              <button className="CompleteTaskButton" onClick={ handleCompleteTask }> Complete </button>
              <button className="RemoveTaskButton" onClick={ handleRemoveTask } >Remove</button>
      </div>
    </div>
  );
}

export default Task;
