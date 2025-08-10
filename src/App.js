import React, { useState, useEffect } from "react";
import FeeCalculator from "./components/FeeCalculator";
import Login from "./components/Login";
import "./App.css";

function App() {
  // Initialize the state by checking localStorage.
  // If a value exists, parse it as a boolean. Otherwise, default to false.
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem("loggedIn");
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });

  // Use a useEffect hook to save the 'loggedIn' state to localStorage
  // every time it changes.
  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <FeeCalculator onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;