import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./Pages/App";

// Mocked components
jest.mock("./Pages/Login", () => () => <div>Login Page</div>);
jest.mock("./Pages/Signup", () => () => <div>Signup Page</div>);
jest.mock("./Pages/home", () => () => <div>Home Page</div>);
jest.mock("./Pages/SideBar", () => () => <div>Sidebar Page</div>);
jest.mock("./Components/Profile", () => () => <div>Profile Page</div>);
jest.mock("./Components/Stocks", () => () => <div>Stocks Page</div>);
jest.mock("./Components/Transacation", () => () => (
  <div>Transactions Page</div>
));
jest.mock("./Components/Holdings", () => () => <div>Holdings Page</div>);
jest.mock("./Components/Reports", () => () => <div>Reports Page</div>);
jest.mock("./Components/Portfolio", () => () => <div>Portfolio Page</div>);

describe("App Component", () => {
  const renderWithRouter = (initialEntries) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <App RouterComponent={({ children }) => <>{children}</>} />
      </MemoryRouter>
    );
  };

  test("renders HomePage component at root path", () => {
    renderWithRouter(["/"]);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Login component at /login path", () => {
    renderWithRouter(["/login"]);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders Signup component at /signup path", () => {
    renderWithRouter(["/signup"]);
    expect(screen.getByText("Signup Page")).toBeInTheDocument();
  });

  test("renders Sidebar component at /login/sidebar path", () => {
    renderWithRouter(["/login/sidebar"]);
    expect(screen.getByText("Sidebar Page")).toBeInTheDocument();
  });

  test("renders Profile component at /profile path", () => {
    renderWithRouter(["/profile"]);
    expect(screen.getByText("Profile Page")).toBeInTheDocument();
  });

  test("renders Stocks component at /stocks path", () => {
    renderWithRouter(["/stocks"]);
    expect(screen.getByText("Stocks Page")).toBeInTheDocument();
  });

  test("renders Transactions component at /transactions path", () => {
    renderWithRouter(["/transactions"]);
    expect(screen.getByText("Transactions Page")).toBeInTheDocument();
  });

  test("renders Holdings component at /holdings path", () => {
    renderWithRouter(["/holdings"]);
    expect(screen.getByText("Holdings Page")).toBeInTheDocument();
  });

  test("renders Reports component at /reports path", () => {
    renderWithRouter(["/reports"]);
    expect(screen.getByText("Reports Page")).toBeInTheDocument();
  });

  test("renders Portfolio component at /portfolio path", () => {
    renderWithRouter(["/portfolio"]);
    expect(screen.getByText("Portfolio Page")).toBeInTheDocument();
  });
});
