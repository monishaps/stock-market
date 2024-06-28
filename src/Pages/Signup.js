import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPasswod] = useState("");
  const [cpassword, setcPasswod] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handelSignup = async () => {
    try {
      if (!name || !email || !password) {
        alert("Please enter all fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      if (password !== cpassword) {
        alert("Password doesn't match");
        return;
      }

      const signupdata = {
        name: name,
        email: email,
        password: password,
      };
      console.log(signupdata);
      const response = await axios.post(
        `https://localhost:7206/api/Registration/registration`,
        signupdata
      );
      console.log(response.data);
      //if (response.status === 200) {
      //window.alert("Registered successfully!");
      if (response.status === 200) {
        toast.success("User registered successfully!");

        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 custom-bg">
      <div className="form_container p-5 rounded bg-white">
        <h3 className="text-center">Sign Up</h3>
        <div className="mb-2">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="test"
            placeholder="Enter Name"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPasswod(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            onChange={(e) => setcPasswod(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="form-control"
          />
        </div>

        <div className="d-grid">
          <button
            type="sumbit"
            onClick={handelSignup}
            className="btn-btn-primary"
          >
            Sign Up
          </button>
        </div>
        <p className="text-end mt-2">
          Already Registered{" "}
          <Link to="/login" className="ms-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
/*import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null); 

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!name || !email || !password || !file) {
        alert("Please enter all fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      if (password !== cpassword) {
        alert("Password doesn't match");
        return;
      }

     
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", file); 

      console.log(formData);

      
      const response = await axios.post(
        `https://localhost:7206/api/Registration/registration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        window.alert("Registered successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 custom-bg">
      <div className="form_container p-5 rounded bg-white">
        <h3 className="text-center">Sign Up</h3>
        <div className="mb-2">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            onChange={(e) => setCPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="file">Upload Image/PDF</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            onClick={handleSignup}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
        <p className="text-end mt-2">
          Already Registered{" "}
          <Link to="/login" className="ms-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;*/
