import React, { useState } from "react";
import "../App.css";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
  const [step, setStep] = useState("email"); // email | code
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // seconds before resend

  // Step 1: Send code
  const handleEmailSubmit = async (e) => {
    e && e.preventDefault(); // allow calling without event (for resend)
    try {
      const res = await fetch("http://localhost:5000/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("code");
        setMessage("Verification code sent to your email.");
        setMessageType("success"); // success message
        setResendDisabled(true);
        setResendTimer(60);

        // Countdown for resend button
        const interval = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setResendDisabled(false);
              return 60;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMessage(data.error || "Failed to send verification code.");
        setMessageType("error"); // error message
      }
    } catch (error) {
      setMessage("Error connecting to server.");
      setMessageType("error"); // error message
    }
  };

  // Step 2: Verify code
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = otp.join(""); // combine 6 digits
    try {
      const res = await fetch("http://localhost:5000/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });
      const data = await res.json();
      if (data.success) {
        onLoginSuccess();
      } else {
        setMessage(data.error || "Invalid verification code.");
        setMessageType("error"); // error message
      }
    } catch (error) {
      setMessage("Error verifying code.");
      setMessageType("error"); // error message
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) { // allow only digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput.focus();
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-header">
        <img
          src={process.env.PUBLIC_URL + "/sisenco.png"}
          alt="Logo"
          className="app-logo"
        />
        <h1 className="header-title">PayPath Smart Fee Calculator</h1>
      </div>

      <h2> Admin Login</h2>

      {/* Step 1: Email form */}
      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="login-form">
          <h3>Enter your Email</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(""); // clear old messages
            }}
          />
          <button type="submit">Send Code</button>
          {message && (
            <p className={`message ${messageType === "success" ? "msg-success" : "msg-error"}`}>
              {message}
            </p>
          )}
        </form>
      )}

      {/* Step 2: OTP verification form */}
      {step === "code" && (
        <form onSubmit={handleCodeSubmit} className="login-form">
          <h3>Enter Verification Code</h3>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onFocus={(e) => e.target.select()}
                className="otp-input"
              />
            ))}
          </div>

          <button type="submit">Verify</button>

          {/* Resend code button */}
          <button
            type="button"
            onClick={handleEmailSubmit}
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend (${resendTimer}s)` : "Resend Code"}
          </button>

          {message && (
            <p className={`message ${messageType === "success" ? "msg-success" : "msg-error"}`}>
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default Login;