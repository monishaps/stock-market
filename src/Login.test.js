import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Login from "./Pages/Login";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  const mockedUseNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockedUseNavigate);
  });

  test("renders the component with fields and buttons", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    screen.debug();
    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("displays error when fields are empty", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Please enter all fields");
    });
  });

  test("shows alert on invalid email format", async () => {
    window.alert = jest.fn();

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter a valid email address"
    );
  });

  test("displays error for invalid user", async () => {
    axios.post.mockResolvedValueOnce({ data: "Invalid User" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid User");
    });
  });

  test("navigates to sidebar on valid user", async () => {
    axios.post.mockResolvedValueOnce({ data: "Valid user" });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://localhost:7206/api/Registration/login",
        {
          email: "test@example.com",
          password: "password123",
        }
      );
    });

    expect(mockedUseNavigate).not.toHaveBeenCalledWith("Sidebar");
  });
});

global.alert = jest.fn();
global.console.log = jest.fn();
