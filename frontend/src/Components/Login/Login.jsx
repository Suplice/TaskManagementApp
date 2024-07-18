import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    Login: "",
    Password: "",
  });

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5065/api/Account/login",
        formData,
      );

        console.log(response);
        localStorage.setItem("JwtToken", response.data.jwtToken);
        localStorage.setItem("loggedIn", "true");
        navigate("/TaskList");

    } catch (error) {

      console.log("login error:", error);

      setErrorMessage("- Invalid login or password, please try again.");
      console.log(errorMessage);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  }

  return (
    <div className="LoginContainer">
      <div className="LoginMenu">
              <form className="LoginForm" onSubmit={handleLogin}>
        <div className="formData">
          <label className="Text"> Login: </label>
          <input
            type="text"
            name="Login"
            value={formData.Login}
            onChange={handleChange}
          ></input>

          <label className="Text"> Password: </label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          ></input>

                      <p className="InputError" id="errorMessage" >{errorMessage}</p>

          </div>
          <div className="buttons">
            <button className="LoginButton" type="submit">
              Login
            </button>
            <button className="ResetButton" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="RedirectToRegister">
        <p className="RedirectToRegisterText">Account not created?</p>
        <Link to="/register" className="RedirectToRegisterButton">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default Login;
