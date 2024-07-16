import { useState } from "react";
import Navigationbar from "./Components/NavigationBar/Navigationbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./Components/TaskList/TaskList";
import Login from "./Components/Login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigationbar></Navigationbar>
      <Routes>
        <Route path="/taskList" element={<TaskList />}></Route>
        <Route path="/login" element={ <Login /> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
