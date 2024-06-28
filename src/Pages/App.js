// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Login";
// import Signup from "./Signup";
// import HomePage from "./Pages/home";
// import Sidebar from "./Pages/SideBar";
// import Profile from "./Components/Profile";
// import Stocks from "./Components/Stocks";
// import Transactions from "./Components/Transacation";
// import Holdings from "./Components/Holdings";
// import Reports from "./Components/Reports";
// import Portfolio from "./Components/Portfolio";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<HomePage />}></Route>
//         <Route path="/Login" element={<Login />}></Route>
//         <Route path="/signup" element={<Signup />}></Route>
//         <Route path="/Login/sidebar" element={<Sidebar />}></Route>
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/stocks" element={<Stocks />} />
//         <Route path="/transactions" element={<Transactions />} />
//         <Route path="/holdings" element={<Holdings />} />
//         <Route path="/reports" element={<Reports />} />
//         <Route path="/portfolio" element={<Portfolio />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import HomePage from "./home";
import Sidebar from "./SideBar";
import Profile from "../Components/Profile";
import Stocks from "../Components/Stocks";
import Transactions from "../Components/Transacation";
import Holdings from "../Components/Holdings";
import Reports from "../Components/Reports";
import Portfolio from "../Components/Portfolio";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ RouterComponent = BrowserRouter }) {
  return (
    <RouterComponent>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/sidebar" element={<Sidebar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </RouterComponent>
  );
}

export default App;
