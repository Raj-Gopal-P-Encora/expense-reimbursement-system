import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Register.css';

function Register() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    isManager: false,
    secret: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setForm({ ...form, isManager: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let role = form.isManager ? "MANAGER" : "EMPLOYEE";
    if (form.isManager && form.secret !== "RAJ") {
      alert("Invalid manager secret code!");
      return;
    }

    api.post("/api/auth/register", {
      username: form.username,
      password: form.password,
      email: form.email,
      role: role
    })
    .then(() => {
      alert("Registration successful! Redirecting to login.");
      navigate("/login");
    })
    .catch((err) => {
      console.error(err);
      alert("Registration failed! This user might already exist.");
    });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username"
              name="username" 
              className="register-input"
              value={form.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              className="register-input"
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              className="register-input"
              value={form.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={form.isManager} 
                onChange={handleCheckbox} 
              />
              Register as Manager
            </label>
          </div>

          {form.isManager && (
            <div className="form-group">
              <label htmlFor="secret">Secret Manager Code:</label>
              <input 
                type="text" 
                id="secret"
                name="secret" 
                className="register-input"
                value={form.secret} 
                onChange={handleChange} 
                required 
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="register-btn">Register</button>
            <Link to="/login" className="back-link">Back to Login</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;