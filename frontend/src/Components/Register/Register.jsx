import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="RegisterContainer">
      <div className="InputData">
        <form className="RegisterForm">
          <div className="Inputs">
            <label>Username:</label>
            <input type="text"></input>
            <p className="ErrorInformation">Username Error!</p>

            <label>Email:</label>
            <input type="email"></input>
            <p className="ErrorInformation">Email error!</p>

            <label>Phone number:</label>
            <input type="tel"></input>
            <p className="ErrorInformation">Phone number error!</p>

            <label>Password:</label>
            <input type="password"></input>
            <p className="ErrorInformation">Password error!</p>
          </div>
          <div className="buttons">
            <button className="RegisterButton" type="submit">
              Register
            </button>
            <button className="ResetButton" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="RedirectToLoginPage">
        <p className="RedirectToLoginText">Already have an account?</p>
        <Link className="RedirectToLoginButton">Login</Link>
      </div>
    </div>
  );
}

export default Register;
