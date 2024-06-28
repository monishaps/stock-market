import React, { useState } from "react";
import axios from "axios";
import "../Pages/css/Transactions.css";

const TransactionPage = () => {
  const [action, setAction] = useState("");
  const [userId, setUserId] = useState("");
  const [stockId, setStockId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAction = (actionType) => {
    setAction(actionType);
  };

  const handleSubmit = async () => {
    console.log(userId, stockId, quantity);
    try {
      let response;
      if (action === "buy") {
        response = await axios.post(
          `https://localhost:7206/api/Transaction/Buy?userId=${userId}&stockId=${stockId}&quantity=${quantity}`
        );
        setMessage("Stock purchased successfully.");
      } else if (action === "sell") {
        // eslint-disable-next-line
        response = await axios.post(
          // eslint-disable-next-line
          `https://localhost:7206/api/Transaction/Sell?userId=${userId}&stockId=${stockId}&quantity=${quantity}`
        );
        setMessage("Stock sold successfully.");
      }
    } catch (error) {
      console.log(error);
      setError("Error performing action. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") {
      setUserId(value);
    } else if (name === "stockId") {
      setStockId(value);
    } else if (name === "quantity") {
      setQuantity(value);
    }
  };

  return (
    <div className="container">
      <h1>Transaction Page</h1>
      <div className="button-container">
        <button onClick={() => handleAction("buy")}>Buy</button>
        <button onClick={() => handleAction("sell")}>Sell</button>
      </div>
      {action && (
        <div>
          <div className="input-container">
            <label>User ID:</label>
            <input
              type="text"
              placeholder="User ID"
              name="userId"
              value={userId}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label>Stock ID:</label>
            <input
              type="text"
              placeholder="Stock ID"
              name="stockId"
              value={stockId}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label>Quantity:</label>
            <input
              type="text"
              placeholder="Quantity"
              name="quantity"
              value={quantity}
              onChange={handleInputChange}
            />
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      <div className="message-container">
        <p>{message}</p>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default TransactionPage;
