import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    Login: "",
    Password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
      setLoading(true);
      try {
          const response = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/Account/login`,
              formData,
          );

          localStorage.setItem("JwtToken", response.data.jwtToken);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("userName", response.data.data.login);
          onLogin();
      } catch (error) {

          setErrorMessage("Invalid login or password, please try again.");
          setFormData((prevState) => ({
              ...prevState,
              Password: "",
          }));
      } finally {
          setLoading(false);
      }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    }

    function handleReset() {
        setFormData({
            Password: "",
            Login: ""
        });

        setErrorMessage("");
    }

  return (
      <div className={`LoginContainer ${loading ? "loading" : ""}`}>
      <div className="LoginMenu">
        <form className="LoginForm" onSubmit={handleLogin}>
          <div className="formData">
            <label className="Text"> Login: </label>
            <input
                          type="text"
                          name="Login"
                          value={formData.Login}
                          onChange={handleChange}
                          disabled={ loading }
            ></input>

            <label className="Text"> Password: </label>
            <input
                          type="password"
                          name="Password"
                          value={formData.Password}
                          onChange={handleChange}
                          disabled={ loading }
            ></input>

            <p className="InputError" id="errorMessage">
              {errorMessage}
            </p>
          </div>
          <div className="buttons">
                      <button className="LoginButton" type="submit" disabled={ loading }>
              Login
            </button>
                      <button className="ResetButton" type="reset" onClick={handleReset} disabled={loading }>
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
