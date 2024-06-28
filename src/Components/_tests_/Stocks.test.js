import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Stocks from "../Stocks";

jest.mock("axios");

describe("Stocks Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //jest.setTimeout(120000);

  test("renders the component with header", () => {
    render(<Stocks />);
    expect(screen.getByText(/stocks/i)).toBeInTheDocument();
  });

  test("fetches and displays stocks", async () => {
    const mockStocks = [
      {
        stockId: "stock1",
        symbol: "AAPL",
        company_Name: "Apple Inc.",
        sector: "Technology",
        exchange: "NASDAQ",
        price: 150,
        quantity: 100,
      },
      {
        stockId: "stock2",
        symbol: "GOOGL",
        company_Name: "Alphabet Inc.",
        sector: "Technology",
        exchange: "NASDAQ",
        price: 2800,
        quantity: 50,
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockStocks });

    render(<Stocks />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://localhost:7206/api/Stocks"
      );
      mockStocks.forEach((stock) => {
        expect(screen.getByText(stock.symbol)).toBeInTheDocument();
        expect(screen.getByText(stock.company_Name)).toBeInTheDocument();
        expect(screen.getByText(`Price: Rs${stock.price}`)).toBeInTheDocument();
        expect(screen.getByText(`Quantity: ${stock.quantity}`)).toBeInTheDocument();
      });
      expect(screen.queryByText(/error fetching stocks/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/no stocks available/i)).not.toBeInTheDocument();
    });
  });
});
