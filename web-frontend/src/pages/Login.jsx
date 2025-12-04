import React, { useState } from "react";
import { userLogin } from "../services/authServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { navigateByRole } from "../utils/roleNavigation";
import "../styles/global.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("test123");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await userLogin({ email, password });

      if (result.status === "error") {
        throw new Error(result.error);
      }

      const token = result.token;
      const user = result.user;

      const { role, status } = user;

      // Check if user is active
      if (status !== "active") {
        toast.error(
          "Your account is inactive. Please contact admin or librarian."
        );
        return;
      }

      toast.success("Login successful!");

      // Save data to Redux
      dispatch(login({ user, token }));

      // role based navigation
      navigateByRole(role, navigate, toast);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-80 mt-5 ">
      <div className="card shadow p-4" style={{ width: "550px" }}>
        <h3 className="text-center mb-4 text-color">Login</h3>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p className="text-center ">
            <Link
              className="text-decoration-none"
              style={{ color: "slateblue" }}
              to={"/register"}
            >
              New user? Register here
            </Link>
          </p>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-info text-white w-50">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
