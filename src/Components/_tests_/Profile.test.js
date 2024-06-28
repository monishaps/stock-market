import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Profile from "../Profile";

jest.mock("axios");

describe("Profile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with input field and button", () => {
    render(<Profile />);
    expect(
      screen.getByText(/enter username to fetch profile/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /fetch profile/i })
    ).toBeInTheDocument();
  });

  test("handles user input for username", () => {
    render(<Profile />);
    const input = screen.getByLabelText(/username:/i);
    fireEvent.change(input, { target: { value: "testuser" } });
    expect(input.value).toBe("testuser");
  });

  test("fetches user profile and displays it", async () => {
    const mockProfile = { email: "testuser@example.com", userId: "testuser" };
    axios.get.mockResolvedValueOnce({ data: mockProfile });

    render(<Profile />);
    const input = screen.getByLabelText(/username:/i);
    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.click(screen.getByRole("button", { name: /fetch profile/i }));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://localhost:7206/api/User/testuser"
      );
      expect(
        screen.getByText(/email: testuser@example.com/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/user id: testuser/i)).toBeInTheDocument();
    });
  });

  test("displays an error message on API error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(<Profile />);
    const input = screen.getByLabelText(/username:/i);
    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.click(screen.getByRole("button", { name: /fetch profile/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/error fetching profile. please try again later./i)
      ).toBeInTheDocument();
    });
  });


  test("clears error message on successful fetch after error", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));
    const mockProfile = { email: "testuser@example.com", userId: "testuser" };
    axios.get.mockResolvedValueOnce({ data: mockProfile });

    render(<Profile />);
    const input = screen.getByLabelText(/username:/i);
    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.click(screen.getByRole("button", { name: /fetch profile/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/error fetching profile. please try again later./i)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /fetch profile/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/error fetching profile. please try again later./i)
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(/email: testuser@example.com/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/user id: testuser/i)).toBeInTheDocument();
    });
  });
});
