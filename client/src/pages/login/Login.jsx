import React, { useState } from 'react';
import "./login.scss";
import newRequest from '../../utils/newRequest';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response ? err.response.data : { message: "An error occurred" }); // Ensure proper error handling
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          id="username"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          id="password"
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        {error && <div className="error-message">{error.message}</div>} {/* Displaying the error message properly */}

        <Link to="/register">
          <button type="button" style={{border:"none",background:"white",color:"black",fontSize:"12px"}}>Create profile</button>
        </Link>
      </form>
    </div>
  );
}
