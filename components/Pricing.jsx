"use client";
import React from "react";
import { FaCheck } from "react-icons/fa";

const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    price: "200",
    period: "month",
    description: "Perfect for small teams and startups",
    features: [
      "Up to 10 team members",
      "Basic testing features",
      "API testing",
      "Email support",
      "5 projects",
      "Basic analytics",
    ],
    highlighted: false,
    priceId: "price_1SOJAICxxJUWv23VYVexmRYV", // Replace with your actual Stripe Price ID
  },
  {
    id: 2,
    name: "Professional",
    price: "99",
    period: "month",
    description: "Best for growing businesses",
    features: [
      "Unlimited team members",
      "Advanced testing features",
      "API & Frontend testing",
      "Priority support",
      "Unlimited projects",
      "Advanced analytics",
      "Custom integrations",
      "AI Agent testing",
    ],
    highlighted: true,
    priceId: "price_1SOJAICxxJUWv23VYVexmRYV", // Replace with your actual Stripe Price ID
  },
];

export default function Pricing() {
  const [loading, setLoading] = React.useState(null);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [email, setEmail] = React.useState("");

  const handleSelectPlan = async (priceId, planName) => {
    setSelectedPlan({ priceId, planName });
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(selectedPlan.priceId);
    
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: selectedPlan.priceId,
          planName: selectedPlan.planName,
          email: email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session. Please try again.");
        setLoading(null);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      setLoading(null);
    }
  };

  const closeModal = () => {
    setShowEmailModal(false);
    setSelectedPlan(null);
    setEmail("");
    setLoading(null);
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Choose Your Plan</h2>
          <p className="pricing-subtitle">
            Select the perfect plan for your testing needs
          </p>
        </div>

        <div className="pricing-cards">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${
                plan.highlighted ? "pricing-card-highlighted" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="pricing-badge">Most Popular</div>
              )}

              <div className="pricing-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="price">{plan.price}</span>
                <span className="period">/{plan.period}</span>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <FaCheck className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`pricing-btn ${
                  plan.highlighted ? "pricing-btn-highlighted" : ""
                }`}
                onClick={() => handleSelectPlan(plan.priceId, plan.name)}
                disabled={loading === plan.priceId}
              >
                {loading === plan.priceId ? "Processing..." : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h3 className="modal-title">Enter Your Email</h3>
            <p className="modal-subtitle">
              We'll send your receipt and subscription details to this email
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modal-input"
                required
                autoFocus
              />
              <button 
                type="submit" 
                className="modal-submit-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue to Payment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
