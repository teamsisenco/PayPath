import React, { useState, useEffect } from "react";
import FeeCalculator from "./components/FeeCalculator";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasAttemptedAutoLogin, setHasAttemptedAutoLogin] = useState(false);

  useEffect(() => {
    const savedLoginState = sessionStorage.getItem("loggedIn");
    if (savedLoginState === "true") {
      setLoggedIn(true);
    }
    setHasAttemptedAutoLogin(true);
  }, []);

  useEffect(() => {
    if (hasAttemptedAutoLogin) {
      sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    }
  }, [loggedIn, hasAttemptedAutoLogin]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("loggedIn");
  };

  if (!hasAttemptedAutoLogin) {
    return null; // or a spinner
  }

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