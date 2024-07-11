import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navigationbar from "./Components/Navigationbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";

function App() {
  return (
      <Router>
          <Navigationbar></Navigationbar>
          <Routes>
          <Route path="/login">
          </Route>
              <Route path="index"></Route>
          </Routes>
      </Router>
  );
}

export default App;
