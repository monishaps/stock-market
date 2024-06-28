import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Portfolio from "../Portfolio";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("Portfolio Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockReset(); 
  });

  test("renders the component with input field and header", () => {
    render(<Portfolio />);
    expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user id:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /fetch owned stock data/i })).toBeInTheDocument();
  });

  test("handles user input for userId", () => {
    render(<Portfolio />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });
    expect(input.value).toBe("user1");
  });

  test("fetches owned stock data and displays it in the pie chart", async () => {
    const mockData = [
      { company_Name: "Company A", quantity: 10 },
      { company_Name: "Company B", quantity: 20 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<Portfolio />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });
    fireEvent.click(
      screen.getByRole("button", { name: /fetch owned stock data/i })
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://localhost:7206/api/OwnedStocks/user1"
      );
      expect(screen.getByText(/company a/i)).toBeInTheDocument();
      expect(screen.getByText(/company b/i)).toBeInTheDocument();
    });
  });

  test("displays an error message on API error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(<Portfolio />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });
    fireEvent.click(
      screen.getByRole("button", { name: /fetch owned stock data/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /error fetching owned stock data. please try again later./i
        )
      ).toBeInTheDocument();
    });
  });
  
  test("does not fetch data if userId is empty", async () => {
    render(<Portfolio />);
    expect(axios.get).not.toHaveBeenCalled();
  });

});
