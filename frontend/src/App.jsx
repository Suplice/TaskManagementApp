import Navigationbar from "./Components/NavigationBar/Navigationbar";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from "./Components/TaskList/TaskList";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AddTaskForm from "./Components/AddTaskForm/AddTaskForm";
import "./App.css";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true" ? "true" : "false");

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "loggedIn") {
                setIsLoggedIn(event.newValue === "true");
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    async function handleLogout() {

        try {
            const token = localStorage.getItem("JwtToken");
            console.log(token);
            const response = await axios.post("http://localhost:5065/Account/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.setItem("JwtToken", '');
            localStorage.setItem("loggedIn", "false");
            localStorage.setItem("userName", '');
            setIsLoggedIn("false");
        }
        catch (error) {

            console.log(error);
        }
    }

    return (
        <Router>
            <Navigationbar onLogout={handleLogout} />
            <Routes>
                {isLoggedIn === "true" ? (
                    <>
                        <Route path="/TaskList" element={<TaskList />} />
                        <Route path="*" element={<Navigate to="/TaskList"/>} />
                        
                        </>
                ) : (
                    <>
                        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn("true")} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
