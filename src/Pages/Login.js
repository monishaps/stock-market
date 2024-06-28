import React from "react";
import "./css/style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [password, setPasswod] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Please enter all fields");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      const logindata = {
        email: email,
        password: password,
      };
      console.log(logindata);
      const response = await axios.post(
        `https://localhost:7206/api/Registration/login`,
        logindata
      );
      if (response.data === "Valid user") {
        navigate("Sidebar");
      } else {
        alert("Invalid User");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 custom-bg">
      <div className="form_container p-5 rounded bg-white">
        {/*<form>*/}
        <h3 className="text-center">Login</h3>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Email"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPasswod(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="form-control"
          />
        </div>
        {/*<div className='mb-2'>
             <input type="checkbox" className='custom-control custom-checkbox' id="check"/>
             <label htmlFor="check" className='custom-input-label ms-2'>
                Remember Me
             </label>
  </div>*/}
        <div className="d-grid">
          <button
            type="sumbit"
            onClick={handelLogin}
            className="btn-btn-primary"
          >
            Login
          </button>
        </div>
        <p className="text-end mt-2">
          Not Registered
          <Link to="/signup" className="ms-2">
            Sign up
          </Link>
        </p>
        {/*</form>*/}
      </div>
    </div>
  );
}

export default Login;
