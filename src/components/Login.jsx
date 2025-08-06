import React, { useState } from "react";
import "../App.css";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const ADMIN_EMAIL = "admin@sisenco.lk";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLoginSuccess(); // Call the prop on successful login
      setMessage("Login successful!");
    } else {
      setMessage("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-header">
        <img src={process.env.PUBLIC_URL + '/sisenco.png'} alt="Logo" className="app-logo" />
        <h1 className="header-title">PayPath Smart Fee Calculator</h1>
      </div>

      <h2> Admin Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Login to Continue</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Login;