// src/CheckoutPage.jsx
import React, { useState, useEffect } from "react";

const CARD_STORAGE_KEY = "eztech_credit_card";

const CheckoutPage = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [message, setMessage] = useState("");
  const [savedCard, setSavedCard] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(CARD_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedCard(parsed);
      } catch (err) {
        console.error("Failed to parse stored card", err);
      }
    }
  }, []);

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;

    if (!cardRegex.test(cardNumber)) {
      setMessage("Card number must be in the format 1234 5678 9012 3456.");
      return;
    }

    if (!cardName.trim()) {
      setMessage("Cardholder name is required.");
      return;
    }

    if (!expiry.trim()) {
      setMessage("Expiration date is required.");
      return;
    }

    if (!cvc.trim() || cvc.length < 3 || cvc.length > 4) {
      setMessage("CVC must be 3 or 4 digits.");
      return;
    }

    const cardData = {
      cardName,
      cardNumber,
      expiry,
      cvc
    };

    localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cardData));
    setSavedCard(cardData);
    setMessage("Card information saved to localStorage for this demo.");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout - Credit Card Details</h1>
      <p>Enter your payment information to complete your EZTechMovie purchase.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Cardholder Name
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Name on card"
              style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Card Number
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <label style={{ flex: 1 }}>
            Expiration (MM/YY)
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="06/28"
              style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
          </label>

          <label style={{ flex: 1 }}>
            CVC
            <input
              type="password"
              value={cvc}
              onChange={(e) =>
                setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="123"
              style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>

        <button type="submit">Save Card</button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem" }}>
          {message}
        </p>
      )}

      {savedCard && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Saved Card</h2>
          <p>Name: {savedCard.cardName}</p>
          <p>Number: {savedCard.cardNumber}</p>
          <p>Expiry: {savedCard.expiry}</p>
          <p>CVC: {"•••"}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
