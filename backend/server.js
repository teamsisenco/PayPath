const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let codes = {}; // Store email -> OTP temporarily

// Send verification email
app.post("/send-verification", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

  codes[email] = { code, expiresAt };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sisencoeducationstaff@gmail.com",
      pass: "iszc ijqp wpeg vpij",
    },
  });

  try {
    await transporter.sendMail({
      from: '"PayPath" <your-email@gmail.com>',
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}. It expires in 5 minutes.`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.json({ success: false, error: error.message });
  }
});

// Verify code
app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  const record = codes[email];

  if (!record) {
    return res.json({ success: false, error: "No code sent to this email." });
  }

  if (Date.now() > record.expiresAt) {
    delete codes[email];
    return res.json({ success: false, error: "OTP has expired. Please request a new one." });
  }

  if (record.code == code) {
    delete codes[email];
    return res.json({ success: true });
  } else {
    return res.json({ success: false, error: "Invalid verification code." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));