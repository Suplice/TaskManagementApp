import { useState } from "react";
import Navigationbar from "./Components/NavigationBar/Navigationbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from "./Components/TaskList/TaskList";
import "./App.css";

function App() {
  return (
      <Router>
          <Navigationbar></Navigationbar>
          <Routes>
              <Route path="/TaskList" element={<TaskList/>} ></Route>
              <Route path="/index" ></Route>
          </Routes>
      </Router>
  );
}

export default App;
