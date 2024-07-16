import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";

function Navigationbar() {
  //temporary to change!
  localStorage.setItem("userStatus", "true");
  localStorage.setItem("UserName", "dupa");
  //

  const userLoggedIn = localStorage.getItem("userStatus") === "true";

  function handleLogout() {}

  return (
    <nav className="navigationContainer">
      <div className="linkContainer">
        {userLoggedIn ? (
          <>
            <Link to="/TaskList" className="LinkButton">
              Task Menu
            </Link>
            <Link to="/login" className="LinkButton" onClick={handleLogout}>
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
          Welcome, {localStorage.getItem("UserName")}
        </p>
      )}
    </nav>
  );
}

export default Navigationbar;
