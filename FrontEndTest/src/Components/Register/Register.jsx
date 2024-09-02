import { Link, useNavigate} from "react-router-dom";
import "./Register.css";
import { useState } from 'react';
import axios from 'axios';


function Register() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    function resetInput() {
        setUserName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');

        setErrors({});

    }

    function validateData() {
        const newErrors = {};

        if (!userName) {
            newErrors.Login = "Username field is required."; 
        }

        if (!email) {
            newErrors.Email = "Email field is required.";
        }

        if (!phoneNumber) {
            newErrors.PhoneNumber = "Phone number field is required.";
        }

        if (!password) {
            newErrors.Password = "password field is required.";
        }

        return newErrors;
    }


    async function registerUser(event) {
        event.preventDefault();
        setLoading(true);

        setErrors({});

        const formErrors = validateData();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }


        const registerData = {
            Login: userName,
            Password: password,
            Email: email,
            PhoneNumber: phoneNumber
        };

 

            try {

                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Account/Register`, registerData, {

                })

                if (response.status === 200) {
                    navigate("/login");
                }

            }
            catch (error) {
                setErrors(error.response.data.errors);
                console.log(error.response.data.errors);
            }
            finally {
                setLoading(false);
            }
        




    }





  return (
      <div className={`RegisterContainer  ${loading? "loading" : ""}`} >
      <div className="InputData">
              <form className="RegisterForm" onSubmit={(event) => registerUser(event) }>
          <div className="Inputs">
            <label>Username:</label>
                      <input type="text" value={ userName } onChange={(e) => setUserName(e.target.value)} placeholder="TestUser"></input>
            <p className="ErrorInformation">{ errors.Login }</p>

            <label>Email:</label>
                      <input type="email" value={ email } onChange={(e) => setEmail(e.target.value) } placeholder="TestUser@test.com"></input>
            <p className="ErrorInformation">{ errors.Email }</p>

            <label>Phone number:</label>
                      <input type="tel" value={ phoneNumber } onChange={(e) => setPhoneNumber(e.target.value) } placeholder="123456789"></input>
                      <p className="ErrorInformation">{ errors.PhoneNumber }</p>

            <label>Password:</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******"></input>
                      {errors.Password &&
                          <div className="ErrorInformation">
                              {Array.isArray(errors.Password) ? errors.Password.map((error, index) => (
                                  <p className="ErrorInformation" key={index}>{error}</p>
                              )) : <p className="ErrorInformation" >{errors.Password}</p>}
                          </div>
                      }
          </div>
          <div className="buttons">
            <button className="RegisterButton" type="submit">
              Register
            </button>
                      <button className="ResetButton" type="reset" onClick={resetInput }>
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="RedirectToLoginPage">
        <p className="RedirectToLoginText">Already have an account?</p>
        <Link className="RedirectToLoginButton" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
