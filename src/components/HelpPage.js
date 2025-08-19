import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function HelpPage() {
  return (
    <div className="page-container help-page">
      <div className="logo-header">
        <img src={process.env.PUBLIC_URL + '/sisenco.png'} alt="Logo" className="company-logo" />
        <h1 className="app-title">Fee Calculation Guide</h1>
      </div>

      <div className="help-content">
        <h2>How Fees are Calculated for Transfer Students</h2>
        <p>This guide explains the fee structure and how the discounts applied to students transferring to the 2026 course based on their previous enrollment year and payments.</p>
        <p>The standard course fee for 2026 is <strong>Rs. 32,000</strong>.</p>

        <div className="help-section">
          <h3>Students Joining in 2025</h3>
          <ul>
            <li><strong>Standard Payments:</strong> If a student has paid Rs. 8,000 or Rs. 16,000, it is treated as a standard installment plan towards the full fee of Rs. 32,000.</li>
            <li><strong>Special Discount (Paid Rs. 24,000):</strong> A student paid Rs. 24,000 in 2025 receives a <strong>25% discount</strong> on that amount (25% of 24,000 = Rs. 6,000). The total paid amount becomes Rs. 18,000 (24,000 - 6,000), then that amount deducted from the full course fee(Rs.32000). <strong>Remaining 14000.</strong> The installment plan is 2 installments of Rs. 7,000.</li>
            <li><strong>Full Payment (Paid Rs. 32,000):</strong> The course fee is fully paid. These students may need to pay an additional fee for LMS if they have watched past video contents.</li>
          </ul>
        </div>

        <div className="help-section">
          <h3>Students from 2024</h3>
          <p>Students from the 2024 batch receive a <strong>50% discount</strong> on the amount they paid in 2024. This discounted amount is then deducted from the new 2026 course fee of Rs. 32,000.</p>
          <ul>
            <li><strong>Example:</strong> If a student paid Rs. 16,000 in 2024, they get a discount of Rs. 8,000 (50% of 16,000). The remaining fee is Rs. 24,000 (32,000 - 8,000).</li>
            <li><strong>Note for Full Payment (Rs. 32,000):</strong> For students who paid the full Rs. 32,000 in 2024, an additional Rs. 2,000 admission fee is included in their remaining balance.</li>
          </ul>
        </div>

        <div className="help-section">
          <h3>Students from 2023</h3>
          <p>Students from 2023 receive a <strong>25% discount</strong> based on their old payments, which adjusts the total course fee they need to pay.</p>
          <ul>
            <li><strong>Paid Rs. 8,000:</strong> A discount of Rs. 2,000 (25% of 8,000) is applied. The new course fee becomes Rs. 30,000.</li>
            <li><strong>Paid Rs. 16,000 / Rs. 17,000:</strong> A discount of Rs. 4,000 (25% of 16,000) is applied. The new course fee becomes Rs. 28,000.</li>
            <li><strong>Paid Full Fee (Rs. 25,000):</strong> These students must pay a fixed fee of <strong>Rs. 26,000</strong> to transfer to the 2026 batch.</li>
          </ul>
        </div>

        <div className="help-section">
          <h3>Students from 2022</h3>
          <p>No discounts are applied for students from the 2022 batch. They are required to pay the <strong>full course fee of Rs. 32,000</strong> to enroll in the 2026 course, regardless of previous payments.</p>
        </div>
        
        <div className="help-section">
          <h3>LMS Video Watched Fee</h3>
          <p>This fee only applies to <strong>2025 students who have paid the full Rs. 32,000</strong> and wish to get a refund after watching LMS content. The fee depends on the class and the duration of access:</p>
          <h4>For Classes P01-P07:</h4>
          <ul>
            <li>1-2 months: Rs. 2,000</li>
            <li>3-4 months: Rs. 4,000</li>
            <li>5-6 months: Rs. 8,000</li>
            <li>7-8 months: Rs. 9,000</li>
            <li>9-10 months: Rs. 12,000</li>
            <li>11+ months: Rs. 16,000</li>
          </ul>
          <h4>For Class P08:</h4>
          <ul>
            <li>1-2 months: Rs. 4,000</li>
            <li>3-4 months: Rs. 8,000</li>
            <li>5-6 months: Rs. 10,000</li>
            <li>7-8 months: Rs. 12,000</li>
            <li>9+ months: Rs. 16,000</li>
          </ul>
        </div>
        
        <Link to="/calculator" className="back-button">
          Back to Calculator
        </Link>
      </div>
    </div>
  );
}

export default HelpPage;