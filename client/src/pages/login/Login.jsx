import React, { useState } from 'react'
import "./login.scss"
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState(null)

  const navigate=useNavigate() 

  const handleSubmit = async (e) => {
    /*pour envoyer les données de formulaires au serveur*/
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      setError(err)
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
        onChange={e=>setUsername(e.target.value)}      />

      <label htmlFor="">Password</label>
      <input
        name="password"
        type="password"
        id="password"
        placeholder='password'
        onChange={e=>setPassword(e.target.value)}
      />
      <button type="submit" >Login</button>
      {error && error}
     </form>
  </div>
  )
}
