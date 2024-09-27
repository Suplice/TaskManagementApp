import "./AddTaskForm.css";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

function AddTaskForm({ isVisible, onClose, onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [errors, setErrors] = new useState({});

  function handleOnClose() {
    resetForm();
    onClose();
  }

  function validateForm() {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title is required.";
    }
    if (!description) {
      newErrors.description = "Description is required.";
    }
    if (!dueDate) {
      newErrors.dueDate = "End Date is required.";
    }

    return newErrors;
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setErrors({});
  }

  async function addTask(event) {
    event.preventDefault();

    setErrors({});

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const task = {
      title,
      description,
      dueDate: dueDate
        ? new Date(dueDate).toISOString()
        : dueDate.toISOString(),
    };

    const token = localStorage.getItem("JwtToken");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/Task/add`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        onAdded();
        setErrors({});
        handleOnClose();
      }
    } catch (error) {
      setErrors(error.response.data.errors);
      setDueDate("");
    }
  }

  return (
    <div
      className="AddTaskContainer"
      id="addTaskContainer"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <form className="AddEventForm" onSubmit={(event) => addTask(event)}>
        <div className="InputInformation">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          ></input>
          <p className="ErrorInformation">{errors.title}</p>

          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></input>
          <p className="ErrorInformation">{errors.description}</p>

          <label>End Date:</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Date"
          ></input>
          <p className="ErrorInformation">{errors.dueDate}</p>
        </div>
        <div className="buttons">
          <button className="AddTask" type="submit">
            AddTask
          </button>
          <button className="ResetInput" type="reset" onClick={resetForm}>
            Reset
          </button>
          <button className="CloseForm" type="button" onClick={handleOnClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;
