import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png.png";

const Sidebar = () => {
  const handlelogout = () => {
    window.location.href = "/";
  };
  return (
    <div style={{ display: "flex" }}>
      <nav className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/profile" className="sidebar-link">
              Profile
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/stocks" className="sidebar-link">
              Stocks
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/transactions" className="sidebar-link">
              Transactions
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/holdings" className="sidebar-link">
              Holdings
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/reports" className="sidebar-link">
              Reports
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/portfolio" className="sidebar-link">
              Portfolio
            </Link>
          </li>
          <li className="sidebar-item">
            <Link onClick={handlelogout} className="sidebar-link">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <div
        style={{
          width: "82%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>About Stock Market</h2>
        <div
          style={{
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "600px",
            marginTop: "20px",
          }}
        >
          <p className="risk-paragraph">
            The stock market offers a variety of financial instruments that give
            investors a choice of securities to invest in depending on their
            risk tolerance and financial objectives, such as shareholdings,
            securities, mutual funds, and derivatives. Investment in a variety
            of equities also provides excellent diversification because it
            lessens the concentration of your portfolio. By providing portfolio
            diversification and balancing market risks, this flexibility is
            useful in reducing the risks associated with stock investing.
          </p>
          <p className="risk-paragraph">
            By utilizing growth in many economic sectors, a well-diversified
            portfolio aids in expanding your wealth and generates a return even
            if certain individual companies decline in value. Buying stock is
            equivalent to acquiring ownership in a corporation. A shareholder
            typically has the ability to cast a vote on corporate decisions. Due
            to their ownership of the business, the shareholders can influence
            management to make decisions that are in their best interests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
