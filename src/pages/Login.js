import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-card">
        <h2 className="form-title">LOGIN</h2>

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

        <button onClick={handleLogin} className="btn-primary">
          Login
        </button>

        <p className="form-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
