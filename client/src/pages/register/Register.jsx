import React, { useState } from 'react';
import "./register.scss";
import upload from '../../utils/upload';
import newRequest from "../../utils/newRequest";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    img: "",
    isSeller: false,
    country: "",
    phone: "",
    desc: ""
  });
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle seller checkbox
  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username || !user.password || !user.email) {
      setError("Please fill in all required fields.");
      return;
    }

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      setError(err.response ? err.response.data : { message: "Registration failed" });
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          {error && <div className="error-message">{error.message || error}</div>} {/* Display error message */}
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label>Country</label>
          <input
            name="country"
            type="text"
            placeholder="USA"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
