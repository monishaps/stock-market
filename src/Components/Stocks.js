import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/css/Stocks.css";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("https://localhost:7206/api/Stocks");
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="stocks-container">
      {" "}
      <h1>Stocks</h1>
      <div className="stock-cards">
        {stocks.map((stock) => (
          <div
            key={stock.stockId}
            className="card"
            style={{ backgroundColor: " rgb(65, 170, 241)" }}
          >
            <h2>{stock.symbol}</h2>
            <p>{stock.stockId}</p>
            <p>{stock.company_Name}</p>
            <p>{stock.sector}</p>
            <p>{stock.exchange}</p>
            <p>Price: Rs{stock.price}</p>
            <p>Quantity: {stock.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stocks;
