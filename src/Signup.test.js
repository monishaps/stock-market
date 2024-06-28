import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./Pages/Signup";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Signup Component", () => {
  const mockedUseNavigate = jest.fn();
   
  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockedUseNavigate);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test("renders the component with fields and buttons", () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("displays error when fields are empty", async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Please enter all fields");
    });
  });

  test("displays error message for invalid email format", async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address');
    });
  });

  test("displays error message when passwords do not match", async () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
      target: { value: "password456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Password doesn't match");
    });
  });

  test('navigates to login on successful signup', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <Router>
        <Signup />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });
});
