import "./Task.css";
import axios from 'axios';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

function Task({ task, onTaskUpdated }) {

    let [taskState, setTaskState] = useState(task);

    let { taskId, title, description, isCompleted, startDate, dueDate } = task;

    let taskCompletedColor = "#00FF7F";

    let taskUnCompletedColor = "#A52A2A"

    let taskOverDueColor = "#4169E1";




    function formatDate(dateString) {
        try {
            const date = parseISO(dateString);
            return format(date, 'yyyy-MM-dd HH:mm');
        }
        catch (error) {
            return null;
        }
    }


    function handleTaskBackgroundShadow() {

        const _dueDate = new Date(dueDate);
        const _currentDate = new Date();

        if (isCompleted) {
            return `0 6px 20px 7px ${taskCompletedColor}`;
        }
        else if (_currentDate > _dueDate) {
            return `0 6px 20px 7px ${taskOverDueColor}`;
        }
        else {
            return `0 6px 20px 7px ${taskUnCompletedColor}`;
        }
    }



    async function handleCompleteTask() {
        if (isCompleted) {
            alert("Task is already completed");
        }
        else {
            const token = localStorage.getItem("JwtToken");
            const updatedTask = { ...taskState, isCompleted: true };


            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Task/Update`,  updatedTask , {
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
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Task/delete`, taskState, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })



            if (response.status === 200) {
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
        <div className="Task-container" style={{ boxShadow: handleTaskBackgroundShadow() }}>
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
