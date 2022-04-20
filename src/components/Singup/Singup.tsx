import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import Alert from '../../elements/Alert';
import Button from '../../elements/Button';
import "./Singup.css";

function Singup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
  
    const { singUp, updateUserName } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        try {
          await singUp(email.toLowerCase(), password)
            .then(() => {
              updateUserName(name);
            });
          
            navigate('/login');
        } catch (err: any) {         
            setError(err.code);
        }
    }

  return (
    <div className="singupWrapper">
      <div className="singupContainer">
        <h2>Sing Up</h2>
        {error && <Alert message={error} type="red" />}
        <form id="singUpForm" onSubmit={handleSubmit}>
          <div className="inputSingupContainer">
            <label>
              <input
                required
                className="singupLogin"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </label>
            <label>
              <input
                required
                className="singupLogin"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </label>
            <label>
              <input
                required
                className="singupLogin"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </label>
          </div>
        </form>

        <Button
          text="Sing up"
          margin
          type="submit"
          form="singUpForm"
          value="submit"
        />
        <div className="toLoginText">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Singup;

{/* <div>
  <h2>Singup page</h2>
  {error && <Alert message={error} type="red" />}
  <form id="singUpForm" onSubmit={handleSubmit}>
    <label>
      Email address:
      <input
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
    </label>
    <label>
      Password:
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="text"
      />
    </label>
  </form>
  <button type="submit" form="singUpForm" value="submit">
    Sing up
  </button>
  <div>
    Already have an account? <Link to="/login">Log in</Link>
  </div>
</div>; */}
