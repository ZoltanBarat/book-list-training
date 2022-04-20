import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import Alert from '../../elements/Alert';
import Button from '../../elements/Button';


import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    
  const { logIn } = useUserAuth();
  const navigate = useNavigate();


  
  const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setError("");

      try {
        await logIn(email.toLowerCase(), password);      
        navigate("/");       
       
      } catch (err: any) {
        setError(err.message);
      }
  };

    
  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2>Log In</h2>
        {error && <Alert message={error} type="red" />}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="inputLoginContainer">
            <label>
              <input
                className="inputLogin"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </label>
            <label>
              <input
                className="inputLogin"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </label>
          </div>
        </form>

        <Button
          text="Login"
          margin
          type="submit"
          form="loginForm"
          value="submit"
        />
        <div className="toSingUpText">
          Don't have an account? <Link to="/singup">Sing up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;