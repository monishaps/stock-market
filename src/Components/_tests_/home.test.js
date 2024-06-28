import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import HomePage from "../../Pages/home";

jest.mock("axios");

describe("HomePage Component", () => {
  const mockTickers = [
    { symbol: "AAPL", price: 150 },
    { symbol: "GOOGL", price: 2800 },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTickers });
  });

  test("renders HomePage with initial state", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("STOCKO LAND")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Stock Market")).toBeInTheDocument();
    expect(
      screen.getByText("Start exploring stocks, transactions, and reports.")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Stock Market Logo")).toBeInTheDocument();
    expect(screen.getByText("Login/Register")).toBeInTheDocument();
  });

  test("fetches and displays tickers", async () => {
    const { container } = render(
      <Router>
        <HomePage />
      </Router>
    );

    
    await waitFor(() => {
      console.log(container.innerHTML); 
    });

    await waitFor(() => {
     
      const tickers = screen.getAllByText((content, element) => {
        const hasAAPL = element.textContent.includes("AAPL Rs150");
        const hasGOOGL = element.textContent.includes("GOOGL Rs2800");
        return hasAAPL || hasGOOGL;
      });

      
      expect(tickers.length).toBe(6);
      expect(tickers[0]).toHaveTextContent("AAPL Rs150");
      expect(tickers[1]).toHaveTextContent("GOOGL Rs2800");
    });
  });
  

  test("handles API errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  
    axios.get.mockRejectedValue(new Error("API Error"));
  
    render(
      <Router>
        <HomePage />
      </Router>
    );
  
    await waitFor(() => {
     
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching tickers:",
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });
  });
  

  test("Login/Register button navigates to login page", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const loginButton = screen.getByText("Login/Register");
    expect(loginButton.closest("a")).toHaveAttribute("href", "/login");
  });
});
