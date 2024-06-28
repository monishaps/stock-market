import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/css/Reports.css";

const Reports = () => {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchTransactions(userId);
    }
  }, [userId]);

  const fetchTransactions = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7206/api/Transaction/${userId}`
      );
      setTransactions(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Error fetching transactions. Please try again later.");
    }
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>
      <div className="input-container">
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      {userId && transactions.length === 0 && (
        <p className="no-transactions-message">
          No transactions found for this user.
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
      {userId && transactions.length > 0 && (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User ID</th>
              <th>Stock ID</th>
              <th>Transaction type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
              <th>Company Name</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.userId}</td>
                <td>{transaction.stockId}</td>
                <td>{transaction.transaction_type}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.price}</td>
                <td>{transaction.date}</td>
                <td>{transaction.company_Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
