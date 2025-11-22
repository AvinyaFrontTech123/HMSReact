import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/auth/register", {
        username,
        password,
      });

      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-card">
        <h2 className="form-title">Register</h2>

        <div className="input-group">
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button onClick={handleRegister} className="btn-primary">
          Register
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
