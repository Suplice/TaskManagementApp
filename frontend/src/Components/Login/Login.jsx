import { Link } from "react-router-dom";
import "./Login.css"

function Login() {
  return (
    <div className="LoginContainer">
          <div className="LoginMenu">
                <form className = "LoginForm" >
                    <label className = "Text"> Login: </label>
                    <input type="text"></input>
                  <p className="InputError"></p>

                    <label className="Text"> Password: </label>
                    <input type="password"></input>
         
                  <div className="buttons">
                        <button className="LoginButton" type="submit">Login</button>
                        <button className="ResetButton" type="reset">Reset</button>
                  </div>
                 </form>
                  </div>
          <div className="RedirectToRegister">
                  <p className="RedirectToRegisterText">Account not created?</p>
                  <Link to="/register" className="RedirectToRegisterButton">Create account</Link>
          </div>
    </div>
  );
}

export default Login;
