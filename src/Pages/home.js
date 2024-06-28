import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png.png";
import "../Pages/css/style.css";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await axios.get("https://localhost:7206/api/Stocks");
        setTickers(response.data);
      } catch (error) {
        console.error("Error fetching tickers:", error);
      }
    };

    fetchTickers();
  }, []);

  return (
    <div>
      <div className="top-bar">
        <p>STOCKO LAND</p>
      </div>
      {/* eslint-disable jsx-a11y/no-distracting-elements */}
      <marquee behavior="scroll" direction="left" scrollamount="10">
        {tickers.map((ticker, index) => (
          <span key={index} className={index % 2 === 0 ? "red" : "green"}>
            {ticker.symbol} Rs{ticker.price} |{" "}
          </span>
        ))}
      </marquee>
      <header className="fixed-top">
        <div className="navbar"></div>
      </header>
      <header className="fixed-top">
        <div className="navbar">
          <div
            className="logo"
            style={{
              position: "absolute",
              top: "600%",
              left: "40%",
              transform: "translate(-20%, 60%)",
            }}
          >
            <Link to="/">
              <img
                src={logo}
                style={{
                  // maxWidth: "50%",
                  // maxHeight: "50%",
                  width: "auto",
                  height: "auto",
                  // eslint-disable-next-line
                  width: "250px",
                }}
                alt="Stock Market Logo"
              />
            </Link>
          </div>
        </div>
      </header>
      <div
        className="content"
        style={{ marginTop: "10px", textAlign: "center" }}
      >
        <h1>Welcome to Stock Market</h1>
        <p>Start exploring stocks, transactions, and reports.</p>
      </div>
      <div
        className="login-button-container"
        style={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, -45%)",
        }}
      >
        <Link to="/login" className="login-button">
          Login/Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
