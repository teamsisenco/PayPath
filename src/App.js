import React, { useState, useEffect } from "react";
import FeeCalculator from "./components/FeeCalculator";
import Login from "./components/Login";
import "./App.css";

function App() {
  // Initialize the 'loggedIn' state by checking localStorage.
  // The function passed to useState is only executed on the initial render.
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      const savedLoginState = localStorage.getItem("loggedIn");
      return savedLoginState ? JSON.parse(savedLoginState) : false;
    } catch (error) {
      console.error("Failed to parse login state from localStorage", error);
      return false;
    }
  });

  // Use useEffect to keep localStorage in sync with the 'loggedIn' state.
  // This hook runs every time 'loggedIn' changes.
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