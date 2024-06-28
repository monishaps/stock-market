import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Reports from "../Reports";

jest.mock("axios");

describe("Reports Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with input field and header", () => {
    render(<Reports />);
    expect(screen.getByText(/reports/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user id:/i)).toBeInTheDocument();
  });

  test("handles user input for userId", () => {
    render(<Reports />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });
    expect(input.value).toBe("user1");
  });

  test("fetches transactions and displays them in a table", async () => {
    const mockTransactions = [
      {
        id: 1,
        transactionId: "txn1",
        userId: "user1",
        stockId: "stock1",
        transaction_type: "buy",
        quantity: 10,
        price: 100,
        date: "2023-01-01",
        company_Name: "Company A",
      },
      {
        id: 2,
        transactionId: "txn2",
        userId: "user1",
        stockId: "stock2",
        transaction_type: "sell",
        quantity: 5,
        price: 200,
        date: "2023-01-02",
        company_Name: "Company B",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockTransactions });

    render(<Reports />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://localhost:7206/api/Transaction/user1"
      );
      expect(screen.getByText("txn1")).toBeInTheDocument();
      expect(screen.getByText("txn2")).toBeInTheDocument();
      expect(screen.getByText("Company A")).toBeInTheDocument();
      expect(screen.getByText("Company B")).toBeInTheDocument();
    });
  });

  test("displays no transactions message when user has no transactions", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Reports />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });

    await waitFor(() => {
      expect(
        screen.getByText(/no transactions found for this user/i)
      ).toBeInTheDocument();
    });
  });

  test("displays error message on API error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(<Reports />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });

    await waitFor(() => {
      expect(
        screen.getByText(
          /error fetching transactions. please try again later./i
        )
      ).toBeInTheDocument();
    });
  });

  test("does not fetch transactions if userId is empty", async () => {
    render(<Reports />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(axios.get).not.toHaveBeenCalled();
    });
  });
});
