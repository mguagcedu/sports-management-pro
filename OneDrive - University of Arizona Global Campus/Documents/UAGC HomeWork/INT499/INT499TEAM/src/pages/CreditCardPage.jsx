import React, { useState } from "react";

function CreditCardPage() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const saveCard = () => {
    const card = { number, name, expiration, cvv };
    localStorage.setItem("creditCard", JSON.stringify(card));
    alert("Card Saved");
  };

  return (
    <div>
      <h2>Enter Card Information</h2>
      <input
        placeholder="1234 5678 9012 3456"
        maxLength="19"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        placeholder="Name on Card"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="MM/YY"
        value={expiration}
        onChange={(e) => setExpiration(e.target.value)}
      />
      <input
        placeholder="CVV"
        maxLength="4"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button onClick={saveCard}>Save Card</button>
    </div>
  );
}

export default CreditCardPage;
