import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

test("TaskList component renders", () => {
  render(<TaskList />);
  const taskListElement = screen.getByRole("textbox");
  expect(taskListElement).toBeInTheDocument();
});

test("fetches and displays tasks", async () => {
  const tasks = [
    {
      taskId: 1,
      title: "Test Title",
      description: "",
      startTime: "",
      endTime: "",
      isCompleted: false,
    },
  ];

  axios.get.mockResolvedValue({ data: { data: tasks } });

  render(<TaskList />);

  await waitFor(() => {
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
  });
});

test("filters tasks based on search input", async () => {
  const tasks = [
    { title: "Task 1", isCompleted: false },
    { title: "Task 2", isCompleted: true },
    { title: "Task 3", isCompleted: false },
  ];

  axios.get.mockResolvedValue({ data: { data: tasks } });

  render(<TaskList />);

  await waitFor(() => {
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 3/i)).toBeInTheDocument();
  });

  const searchInput = screen.getByRole("textbox");
  fireEvent.change(searchInput, { target: { value: "Task 1" } });

  const searchIcon = screen.getByRole("img", { name: /Search Icon/i });
  fireEvent.click(searchIcon);

  await waitFor(() => {
    expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Task 3/i)).not.toBeInTheDocument();
  });
});

test("Add Task Form is displayed when Add Task button is clicked", async () => {
  render(<TaskList />);

  const addTaskButton = screen.getByText(/Add Task/i);
  fireEvent.click(addTaskButton);

  await waitFor(() => {
    expect(document.getElementsByClassName("Overlay")[0]).toBeInTheDocument();
  });
});

test("Filter dropdown changes display when Filter Tasks button is clicked", async () => {
  render(<TaskList />);

  const filterButton = screen.getByText(/Filter Tasks/i);
  fireEvent.click(filterButton);

  const filterMenu = document.getElementsByClassName("DropdownContent")[0];

  await waitFor(() => {
    expect(filterMenu).toBeInTheDocument();
  });

  fireEvent.click(filterButton);
  await waitFor(() => {
    expect(filterMenu).not.toBeInTheDocument();
  });
});

test("Filter tasks based on radio button selection", async () => {
  const Tasks = [
    { taskid: 1, title: "Task 1", isCompleted: false },
    { taskid: 2, title: "Task 2", isCompleted: true },
    { taskid: 3, title: "Task 3", isCompleted: false },
  ];

  axios.get.mockResolvedValue({ data: { data: Tasks } });

  render(<TaskList />);

  await waitFor(() => {
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 3/i)).toBeInTheDocument();
  });

  const filterButton = screen.getByText(/Filter Tasks/i);
  fireEvent.click(filterButton);

  const completedRadio = document.getElementById("completed");
  fireEvent.click(completedRadio);

  await waitFor(() => {
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });
});
