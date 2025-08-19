import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function FeeCalculator({ onLogout }) {
  const [yearJoined, setYearJoined] = useState("2025");
  const [prevPayment, setPrevPayment] = useState("");
  const [lmsMonths, setLmsMonths] = useState("");
  const [showLmsInput, setShowLmsInput] = useState(false);
  const [output, setOutput] = useState(null);
  const [classJoined, setClassJoined] = useState("P01");
  const [show2023Info, setShow2023Info] = useState(false);

  const lmsFeeSlabs = {
    P08: [
      { range: "1-2 months", fee: 4000 },
      { range: "3-4 months", fee: 8000 },
      { range: "5-6 months", fee: 10000 },
      { range: "7-8 months", fee: 12000 },
      { range: "9+ months", fee: 16000 },
    ],
    P01_P07: [
      { range: "1-2 months", fee: 2000 },
      { range: "3-4 months", fee: 4000 },
      { range: "5-6 months", fee: 8000 },
      { range: "7-8 months", fee: 9000 },
      { range: "9-10 months", fee: 12000 },
      { range: "11+ months", fee: 16000 },
    ],
  };

  useEffect(() => {
    const disableScrollOnNumber = (e) => {
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    };

    window.addEventListener("wheel", disableScrollOnNumber, { passive: true });

    return () => {
      window.removeEventListener("wheel", disableScrollOnNumber);
    };
  }, []);

  const handleCalculate = (e) => {
    e.preventDefault();
    const paid = parseFloat(prevPayment);
    let result = {
      summary: "",
      breakdown: [],
      lmsFee: null,
      showLmsSlabs: false,
      selectedLmsSlabs: [],
    };

    if (yearJoined === "2025") {
      if (paid === 8000) {
        result.summary = "Standard plan.";
        result.breakdown.push(
          { label: "Amount Paid", value: "Rs. 8000" },
          { label: "Remaining", value: "Rs. 24000" },
          { label: "Installment Plan", value: "3 installments of Rs. 8000" }
        );
        setShowLmsInput(false);
      } else if (paid === 16000) {
        result.summary = "Standard plan.";
        result.breakdown.push(
          { label: "Amount Paid", value: "Rs. 16000" },
          { label: "Remaining", value: "Rs. 16000" },
          { label: "Installment Plan", value: "2 installments of Rs. 8000" }
        );
        setShowLmsInput(false);
      } else if (paid === 24000) {
        const discount = 0.25 * 24000;
        const adjustedPaid = 24000 - discount;
        const remaining = 32000 - adjustedPaid;

        result.summary = "Eligible for 25% discount on Rs. 24000.";
        result.breakdown.push(
          { label: "Amount Paid in 2025", value: "Rs. 24000" },
          {
            label: "25% Discount added to Paid Amount",
            value: `Rs. ${discount}`,
          },
          { label: "Adjusted Paid", value: `Rs. ${adjustedPaid}` },
          {
            label: "Remaining (18000 Deducted From Full Course Fee)",
            value: `Rs. ${remaining}`,
          },
          { label: "Installment Plan", value: "2 installments of Rs. 7000" }
        );
        setShowLmsInput(false);
      } else if (paid === 32000) {
        result.summary = "Full course fee paid.";
        result.breakdown.push(
          { label: "Amount Paid", value: "Rs. 32000" },
          { label: "Remaining", value: "No remaining installments" }
        );
        setShowLmsInput(true);
      } else {
        result.summary = "Invalid previous payment amount.";
        setShowLmsInput(false);
      }
    }

    if (yearJoined === "2024") {
      const discount = 0.5 * paid;
      const courseFee = 32000;
      const adjustedPaid = discount;
      let remaining = courseFee - adjustedPaid;

      result.summary = "Eligible for 50% discount from 2024 payment.";
      result.breakdown.push(
        { label: "Amount Paid in 2024", value: `Rs. ${paid}` },
        { label: "50% Discount Applied to Paid Amount", value: `Rs. ${discount}` },
        { label: "Deducted from Rs. 32000", value: `Rs. ${remaining}` },
        { label: "Remaining", value: `Rs. ${remaining}` }
      );

      if (paid === 8000) {
        result.breakdown.push({
          label: "Installment Plan",
          value: "3 installments of Rs. 8000 + 1 installment of Rs. 4000",
        });
      } else if (paid === 16000) {
        result.breakdown.push({
          label: "Installment Plan",
          value: "3 installments of Rs. 8000",
        });
      } else if (paid === 24000) {
        result.breakdown.push({
          label: "Installment Plan",
          value: "2 installments of Rs. 8000 + 1 installment of Rs. 4000",
        });
      } else if (paid === 32000) {
        remaining += 2000;
        result.breakdown.pop();
        result.breakdown.push(
          {
            label: "Includes Additional Fee",
            value: "Rs. 2000 (Admission Fee)",
          },
          { label: "Remaining", value: `Rs. ${remaining}` },
          { label: "Installment Plan", value: "2 installments of Rs. 9000" }
        );
      } else {
        result.summary = "Invalid previous payment amount.";
        result.breakdown = [];
      }

      setShowLmsInput(false);
    }

    if (yearJoined === "2023") {
      if (paid === 8000) {
        result.summary = "25% (Rs. 2000) deducted from course fee.";
        result.breakdown.push(
          { label: "Amount Paid in 2023", value: "Rs. 8000" },
          { label: "25% Discount from Old Payment", value: "Rs. 2000" },
          { label: "Adjusted Course Fee", value: "Rs. 30000" },
          { label: "Remaining", value: "Rs. 30000" },
          {
            label: "Installment Plan",
            value: "3 installments of Rs. 8000 + 1 installment of Rs. 6000",
          }
        );
      } else if (paid === 16000 || paid === 17000) {
        result.summary = "25% (Rs. 4000) deducted from course fee.";
        result.breakdown.push(
          { label: "Amount Paid in 2023", value: "Rs. 17000" },
          { label: "25% Discount from Old Payment", value: "Rs. 4000" },
          { label: "Adjusted Course Fee", value: "Rs. 28000" },
          { label: "Remaining", value: "Rs. 28000" },
          {
            label: "Installment Plan",
            value: "3 installments of Rs. 8000 + 1 installment of Rs. 4000",
          }
        );
      } else if (paid === 25000) {
        result.summary = "Fixed Rs. 26000 to be paid for 2026 transfer.";
        result.breakdown.push(
          { label: "Amount Paid in 2023", value: "Rs. 25000 (Full)" },
          { label: "New Fee to be Paid", value: "Rs. 26000" },
          {
            label: "Installment Plan",
            value: "2 installments of Rs. 8000 + 1 installment of Rs. 10000",
          }
        );
      } else {
        result.summary = "Invalid previous payment amount.";
        result.breakdown = [];
      }

      setShowLmsInput(false);
    }

    if (yearJoined === "2022") {
      const validPayments = [5000, 10000, 15000, 20000];

      if (validPayments.includes(paid)) {
        result.summary =
          "Full course fee (Rs. 32000) needs to be paid for 2026 transfer.";
        result.breakdown.push(
          { label: "Amount Paid in 2022", value: `Rs. ${paid}` },
          { label: "Full 2026 Course Fee Required", value: "Rs. 32000" },
          { label: "Need to Pay", value: "Rs. 32000" },
          { label: "Installment Plan", value: "4 installments of Rs. 8000" }
        );
      } else {
        result.summary = "Invalid previous payment amount.";
        result.breakdown = [];
      }

      setShowLmsInput(false);
    }

    if (yearJoined === "2025" && paid === 32000 && lmsMonths) {
      const months = parseInt(lmsMonths);
      let lmsFee = 0;

      if (classJoined === "P08") {
        if (months <= 2) lmsFee = 4000;
        else if (months <= 4) lmsFee = 8000;
        else if (months <= 6) lmsFee = 10000;
        else if (months <= 8) lmsFee = 12000;
        else lmsFee = 16000;
      } else {
        if (months <= 2) lmsFee = 2000;
        else if (months <= 4) lmsFee = 4000;
        else if (months <= 6) lmsFee = 8000;
        else if (months <= 8) lmsFee = 9000;
        else if (months <= 10) lmsFee = 12000;
        else lmsFee = 16000;
      }

      result.lmsFee = lmsFee;
    }

    if (showLmsInput) {
      result.showLmsSlabs = true;
      result.selectedLmsSlabs =
        classJoined === "P08" ? lmsFeeSlabs.P08 : lmsFeeSlabs.P01_P07;
    }

    setOutput(result);
  };

  return (
    <div className="page-container">
      <div className="logout-bar">
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="logo-header">
        <img src={process.env.PUBLIC_URL + '/sisenco.png'} alt="Logo" className="company-logo" />
        <h1 className="app-title">PayPath Smart Fee Calculator</h1>
      </div>
      <div className="left-form">
        <form onSubmit={handleCalculate}>
          <label>
            Class Joined Year:
            <select
              value={yearJoined}
              onChange={(e) => {
                const selectedYear = e.target.value;
                setYearJoined(selectedYear);
                setShowLmsInput(false);
                setOutput(null);
                setPrevPayment("");
                setShow2023Info(selectedYear === "2023" || selectedYear === "2022");
              }}
              required
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </label>

          {show2023Info && (
            <>
              {yearJoined === "2023" && (
                <div className="info-box">
                  <p>
                    <strong>2023 class Fee Details:</strong>
                  </p>
                  <ul>
                    <li>
                      Full course fee in 2023: <strong>Rs. 25000</strong>
                    </li>
                    <li>Installment Plan:</li>
                    <ul>
                      <li>1st installment: Rs. 8000</li>
                      <li>2nd installment: Rs. 9000</li>
                      <li>3rd installment: Rs. 8000</li>
                    </ul>
                  </ul>
                </div>
              )}
              {yearJoined === "2022" && (
                <div className="info-box">
                  <p>
                    <strong>2022 class Fee Details:</strong>
                  </p>
                  <ul>
                    <li>
                      Full course fee in 2022: <strong>Rs. 20000</strong>
                    </li>
                    <li>Installment Plan:</li>
                    <ul>
                      <li>1st installment: Rs. 5000</li>
                      <li>2nd installment: Rs. 5000</li>
                      <li>3rd installment: Rs. 5000</li>
                      <li>4th installment: Rs. 5000</li>
                    </ul>
                  </ul>
                </div>
              )}
            </>
          )}

          <label>
            Previous Payment (Rs.):
            <input
              type="number"
              value={prevPayment}
              onChange={(e) => {
                setPrevPayment(e.target.value);
                setShowLmsInput(yearJoined === "2025" && e.target.value === "32000");
                setLmsMonths("");
                setClassJoined("P01");
              }}
              required
            />
          </label>

          {showLmsInput && (
            <>
              <label>
                Class Joined in 2025:
                <select
                  value={classJoined}
                  onChange={(e) => setClassJoined(e.target.value)}
                  required
                >
                  <option value="P01">P01</option>
                  <option value="P02">P02</option>
                  <option value="P03">P03</option>
                  <option value="P04">P04</option>
                  <option value="P05">P05</option>
                  <option value="P06">P06</option>
                  <option value="P07">P07</option>
                  <option value="P08">P08</option>
                </select>
              </label>

              <label>
                LMS Video Watched Duration (Months):
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={lmsMonths}
                  onChange={(e) => setLmsMonths(e.target.value)}
                  required
                />
              </label>
            </>
          )}
          <button type="submit">Calculate</button>
        </form>
      </div>

      <div className="right-output">
        <h3>Result:</h3>
        {output && (
          <div className="output-box">
            <p className="summary">{output.summary}</p>
            <table>
              <tbody>
                {output.breakdown.map((item, index) => {
                  const isHighlight =
                    item.label.toLowerCase().includes("remaining") ||
                    item.label.toLowerCase().includes("installment") ||
                    item.label.toLowerCase().includes("need to pay");

                  return (
                    <tr key={index} className={isHighlight ? "highlight" : ""}>
                      <td>{item.label}</td>
                      <td className="value">{item.value}</td>
                    </tr>
                  );
                })}
                {output.lmsFee !== null && (
                  <tr className="highlight">
                    <td>LMS Video Watched Fee</td>
                    <td className="value">Rs. {output.lmsFee}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {output.showLmsSlabs && (
              <>
                <h4 style={{ marginTop: "25px", color: "#1a73e8" }}>
                  LMS Video Fee Breakdown ({classJoined})
                </h4>
                <table className="lms-slab-table">
                  <thead>
                    <tr>
                      <th>Watched Duration (Months)</th>
                      <th>Fee (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {output.selectedLmsSlabs.map((slab, idx) => (
                      <tr key={idx}>
                        <td>{slab.range}</td>
                        <td>{slab.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About PayPath</h4>
            <p>
              PayPath - Smart Fee Calculator accurately calculates fees for transferring students, applying discounts based on their previous payments. It helps staff quickly determine the exact amount due, eliminating manual calculations and simplifying the enrollment process.
            </p>
          </div>

          <div className="footer-section">
            <h4>Help & Support</h4>
            <Link to="/help" className="help-link">
                Click here to learn how the fees are calculated.
              </Link>
            <h4>Connect with us</h4>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/sisencokoreanclass/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/sisenco_korean_language_centre/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@PradeepWijesiriwardana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.tiktok.com/@sisencoklc?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>          
        </div>
        <p className="footer-bottom">© Sisenco Korean Language Center. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FeeCalculator;