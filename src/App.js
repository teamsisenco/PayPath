import React, { useState } from "react";
import FeeCalculator from "./components/FeeCalculator"; // Corrected path
import Login from "./components/Login"; // Corrected path
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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