import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeeCalculator from "./components/FeeCalculator";
import Login from "./components/Login";
import HelpPage from "./components/HelpPage"; // Import the new help page
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
    return null; // or a loading spinner
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* If logged in, redirect from login page to calculator */}
          <Route 
            path="/login" 
            element={
              loggedIn ? <Navigate to="/calculator" /> : <Login onLoginSuccess={handleLoginSuccess} />
            } 
          />
          
          {/* Protect the FeeCalculator route */}
          <Route 
            path="/calculator" 
            element={
              loggedIn ? <FeeCalculator onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />

          {/* Protect the HelpPage route */}
          <Route 
            path="/help" 
            element={
              loggedIn ? <HelpPage /> : <Navigate to="/login" />
            } 
          />

          {/* Default route: redirect to calculator if logged in, else to login */}
          <Route 
            path="*"
            element={<Navigate to={loggedIn ? "/calculator" : "/login"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;