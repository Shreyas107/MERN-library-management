import React, { useState } from "react";
import { userRegister } from "../services/authServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import "../styles/global.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "@gmail.com",
    password: "test123",
    phone: "12345",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await userRegister(form);

      if (result.status === "error") {
        throw new Error(result.error);
      }

      toast.success("Registration successful! You can now log in.");

      // redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-80 mt-5">
      <div className="card shadow p-4" style={{ width: "550px" }}>
        <h3 className="text-center mb-4 text-color">Register</h3>

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="Enter full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <p className="text-center">
            <Link className="text-decoration-none text-color" to={"/login"}>
              Already a user? Log in here
            </Link>
          </p>

          {/* Submit */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-info w-50 text-white">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
