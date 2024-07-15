import { useState } from "react";
import Navigationbar from "./Components/NavigationBar/Navigationbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

function App() {
  return (
      <Router>
          <Navigationbar></Navigationbar>
          <Routes>
          <Route path="/login"></Route>
          <Route path="/index" ></Route>
          </Routes>
      </Router>
  );
}

export default App;
