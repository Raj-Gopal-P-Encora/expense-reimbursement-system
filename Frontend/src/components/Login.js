import React, { useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";
import '../styles/Login.css';

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    api.post("/api/auth/login", { username, password })
    .then(res => {
      if (res.data.status === "SUCCESS") {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        if (res.data.role === "MANAGER") 
            window.location.href = "/manager";

        else 
            window.location.href = "/expenses/" + res.data.id;
      }
      else{
        alert("Invalid login!");
      }
    })
    .catch(error => {
        console.error("Login API error:", error);
        alert("Login failed. Please try again.");
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        
        <input 
          className="login-input"
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          value={username}
        /> 
        
        <input 
          className="login-input"
          placeholder="Password" 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        /> 
        
        <div className="login-actions">
          <button onClick={handleLogin} className="login-btn">
            Login
          </button>
          
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;