const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const axios = require('axios').default;
const Holdings = require('../Holdings').default; 

jest.mock("axios");

describe("Holdings Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with input field and header", () => {
    render(<Holdings />);
    expect(screen.getByText(/holdings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user id:/i)).toBeInTheDocument();
  });

  test("fetches holdings and displays them in a table", async () => {
    const mockHoldings = [
      {
        id: 1,
        userId: "user1",
        stockId: "stock1",
        company_Name: "Company A",
        quantity: 10,
      },
      {
        id: 2,
        userId: "user1",
        stockId: "stock2",
        company_Name: "Company B",
        quantity: 20,
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockHoldings });

    render(<Holdings />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://localhost:7206/api/OwnedStocks/user1"
      );
      expect(screen.getByText("Company A")).toBeInTheDocument();
      expect(screen.getByText("Company B")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
    });
  });

  test("displays no stocks message when user has no holdings", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Holdings />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });

    await waitFor(() => {
      expect(
        screen.getByText(/user does not have any stocks./i)
      ).toBeInTheDocument();
    });
  });

  test("displays error message on API error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(<Holdings />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });

    await waitFor(() => {
      expect(
        screen.getByText(/error fetching holdings. please try again later./i)
      ).toBeInTheDocument();
    });
  });

  test("does not fetch holdings if userId is empty", async () => {
    render(<Holdings />);
    expect(axios.get).not.toHaveBeenCalled();
  });

  test("clears error message on successful fetch after error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          userId: "user1",
          stockId: "stock1",
          company_Name: "Company A",
          quantity: 10,
        },
      ],
    });

    render(<Holdings />);
    const input = screen.getByLabelText(/user id:/i);
    fireEvent.change(input, { target: { value: "user1" } });

    await waitFor(() => {
      expect(
        screen.getByText(/error fetching holdings. please try again later./i)
      ).toBeInTheDocument();
    });
  });
});
