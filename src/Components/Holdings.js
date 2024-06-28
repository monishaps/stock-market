import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/css/Holdings.css";

const Holdings = () => {
  const [userId, setUserId] = useState("");
  const [holdings, setHoldings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchHoldings(userId);
    }
  }, [userId]);

  const fetchHoldings = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7206/api/OwnedStocks/${userId}`
      );
      setHoldings(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching holdings:", error);
      setError("Error fetching holdings. Please try again later.");
    }
  };

  return (
    <div className="holdings-container">
      <h1>Holdings</h1>
      <div className="input-container">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      {userId && holdings.length === 0 && (
        <p className="no-stocks-message">User does not have any stocks.</p>
      )}
      {error && <p className="error-message">{error}</p>}
      {userId && holdings.length > 0 && (
        <table className="holdings-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Stock ID</th>
              <th>Company Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.id}>
                <td>{holding.userId}</td>
                <td>{holding.stockId}</td>
                <td>{holding.company_Name}</td>
                <td>{holding.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Holdings;
