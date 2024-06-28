import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import TransactionPage from "../Transacation";

jest.mock("axios");

describe("TransactionPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders TransactionPage component", () => {
    render(<TransactionPage />);

    expect(screen.getByText("Transaction Page")).toBeInTheDocument();
  });

  test("handles action button clicks", async () => {
    render(<TransactionPage />);

    await fireEvent.click(screen.getByText("Buy"));
    expect(screen.getByText("User ID:")).toBeInTheDocument();
    expect(screen.getByText("Stock ID:")).toBeInTheDocument();
    expect(screen.getByText("Quantity:")).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Sell"));
    expect(screen.getByText("User ID:")).toBeInTheDocument();
    expect(screen.getByText("Stock ID:")).toBeInTheDocument();
    expect(screen.getByText("Quantity:")).toBeInTheDocument();
  });

  test("handles form submission for buying stock", async () => {
    render(<TransactionPage />);

    
    axios.post.mockResolvedValueOnce({
      data: { message: "Stock purchased successfully." },
    });

    fireEvent.click(screen.getByText("Buy"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("User ID")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Stock ID")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Quantity")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("User ID"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stock ID"), {
      target: { value: "AAPL" },
    });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByText("Submit"));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "https://localhost:7206/api/Transaction/Buy?userId=123&stockId=AAPL&quantity=10"
      );
      expect(
        screen.getByText("Stock purchased successfully.")
      ).toBeInTheDocument();
    });
  });

  test("handles form submission for selling stock", async () => {
    render(<TransactionPage />);

    
    axios.post.mockResolvedValueOnce({
      data: { message: "Stock sold successfully." },
    });

    fireEvent.click(screen.getByText("Sell"));

    fireEvent.change(screen.getByPlaceholderText("User ID"), {
      target: { value: "456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stock ID"), {
      target: { value: "GOOG" },
    });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), {
      target: { value: "5" },
    });

    fireEvent.click(screen.getByText("Submit"));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "https://localhost:7206/api/Transaction/Sell?userId=456&stockId=GOOG&quantity=5"
      );
      expect(screen.getByText("Stock sold successfully.")).toBeInTheDocument();
    });
  });

  test("handles error during form submission", async () => {
    render(<TransactionPage />);

    
    axios.post.mockRejectedValueOnce(new Error("Failed to perform action."));

    fireEvent.click(screen.getByText("Buy"));

    fireEvent.change(screen.getByPlaceholderText("User ID"), {
      target: { value: "789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stock ID"), {
      target: { value: "MSFT" },
    });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), {
      target: { value: "15" },
    });

    fireEvent.click(screen.getByText("Submit"));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "https://localhost:7206/api/Transaction/Buy?userId=789&stockId=MSFT&quantity=15"
      );
      expect(
        screen.getByText("Error performing action. Please try again later.")
      ).toBeInTheDocument();
    });
  });
});
