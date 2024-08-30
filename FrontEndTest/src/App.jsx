import Navigationbar from "./Components/NavigationBar/Navigationbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./Components/TaskList/TaskList";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true" ? "true" : "false",
  );

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


    useEffect(() => {
        async function validateToken() {
            const token = localStorage.getItem("JwtToken");

            if (token) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Account/validateToken`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    )

                    if (response.status === 200) {
                        setIsLoggedIn("true");
                    }
                    else {
                        setIsLoggedIn("false");
                        localStorage.setItem("loggenIn", "false");
                        localStorage.setItem("JwtToken", "");
                        localStorage.setItem("userName", "");
                    }

                }
                catch (error) {
                    setIsLoggedIn("false");
                    localStorage.setItem("loggedIn", "false");
                    localStorage.setItem("userName", "");
                    localStorage.setItem("JwtToken", "");
                }
            }
            else {
                setIsLoggedIn("false");
            }
        }

        validateToken();

    }, []);





  async function handleLogout() {
    try {
      const token = localStorage.getItem("JwtToken");
      const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/Account/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.setItem("JwtToken", "");
      localStorage.setItem("loggedIn", "false");
      localStorage.setItem("userName", "");
      setIsLoggedIn("false");
    } catch (error) {
        alert("An error occured while trying to log out");
    }
  }

    return (
      <div id="site">
    <Router>
      <Navigationbar onLogout={handleLogout} />
      <Routes>
        {isLoggedIn === "true" ? (
          <>
            <Route path="/TaskList" element={<TaskList />} />
            <Route path="*" element={<Navigate to="/TaskList" />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<Login onLogin={() => setIsLoggedIn("true")} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
            </Router>
        </div>
  );
}

export default App;
