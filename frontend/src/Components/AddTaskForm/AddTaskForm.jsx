import "./AddTaskForm.css";

function AddTaskForm({ isVisible, onClose }) {

  return (
    <div
          className="AddTaskContainer" id="addTaskContainer"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <form className="AddEventForm">
        <div className="InputInformation">
          <label>Title:</label>
          <input type="text"></input>
          <p className="ErrorInformation">Danger Text!</p>

          <label>Description:</label>
          <input type="text"></input>
          <p className="ErrorInformation">Danger Text!</p>

          <label>End Date:</label>
          <input type="date"></input>
          <p className="ErrorInformation">Danger Text!</p>
        </div>
        <div className="buttons">
          <button className="AddTask" type="submit">
            AddTask
          </button>
          <button className="ResetInput" type="reset">
            Reset
          </button>
          <button className="CloseForm" type="button" onClick={onClose} >Close</button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;
