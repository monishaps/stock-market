import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/css/Portfolio.css";
import { PieChart, Pie, Tooltip, Legend, Cell, Label } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Portfolio = () => {
  const [userId, setUserId] = useState("");
  const [ownedStockData, setOwnedStockData] = useState([]);
  const [error, setError] = useState(null);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchOwnedStockData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7206/api/OwnedStocks/${userId}`
      );
      setOwnedStockData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching owned stock data:", error);
      setError("Error fetching owned stock data. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOwnedStockData();
  };

  return (
    <div className="container">
      <h1>Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={handleUserIdChange} />
        </label>
        <button type="submit">Fetch Owned Stock Data</button>
      </form>
      <div className="chart-container">
        <h2 className="chart-title">Owned Stock Pie Chart</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <PieChart width={400} height={400}>
            <Pie
              data={ownedStockData}
              dataKey="quantity"
              nameKey="company_Name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {ownedStockData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                // value={({ name }) => name}
                position="inside"
                fontSize={14}
              />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
