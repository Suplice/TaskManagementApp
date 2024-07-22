import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import axios from "axios";

function Navigationbar({ onLogout }) {
  const userLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <nav className="navigationContainer">
      <div className="linkContainer">
        {userLoggedIn ? (
          <>
            <Link to="/TaskList" className="LinkButton">
              Task Menu
            </Link>
            <Link className="LinkButton" onClick={onLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="LinkButton">
              Login
            </Link>
            <Link to="/register" className="LinkButton">
              Register
            </Link>
          </>
        )}
      </div>
      {userLoggedIn && (
        <p className="WelcomeText">
          Welcome, {localStorage.getItem("userName")}
        </p>
      )}
    </nav>
  );
}

export default Navigationbar;
