import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../../Pages/SideBar";

describe("Sidebar Component", () => {
  beforeEach(() => {
    
    delete window.location;
    window.location = { href: jest.fn() };
  });

  test("renders Sidebar with all links and logo", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Stocks")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Holdings")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("About Stock Market")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /The stock market offers a variety of financial instruments/
      )
    ).toHaveLength(1);
  });

  test("Logout link triggers handlelogout function and redirects to home page", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(window.location.href).toBe("/");
  });

  test("Sidebar links navigate to the correct routes", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    expect(screen.getByText("Profile").closest("a")).toHaveAttribute("href","/profile");
    expect(screen.getByText("Stocks").closest("a")).toHaveAttribute("href","/stocks");
    expect(screen.getByText("Transactions").closest("a")).toHaveAttribute("href","/transactions");
    expect(screen.getByText("Holdings").closest("a")).toHaveAttribute("href","/holdings");
    expect(screen.getByText("Reports").closest("a")).toHaveAttribute("href","/reports");
    expect(screen.getByText("Portfolio").closest("a")).toHaveAttribute("href","/portfolio");
  });
});
