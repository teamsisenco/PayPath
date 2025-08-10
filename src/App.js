import React, { useState, useEffect } from "react";
import FeeCalculator from "./components/FeeCalculator";
import Login from "./components/Login";
import "./App.css";

function App() {
  // Initialize the 'loggedIn' state directly by checking localStorage.
  // This runs only once when the component is first created.
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      const savedLoginState = localStorage.getItem("loggedIn");
      return savedLoginState ? JSON.parse(savedLoginState) : false;
    } catch (error) {
      console.error("Failed to parse login state from localStorage", error);
      return false;
    }
  });

  // This useEffect will run whenever the 'loggedIn' state changes,
  // keeping localStorage in sync with the state.
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