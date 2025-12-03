import React from "react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-center"
      style={{
        position: "fixed",
        inset: 0,
      }}
    >
      <div>
        <h1 className="display-4 text-danger mb-3">
          <i className="bi bi-shield-lock-fill"></i> Unauthorized
        </h1>

        <p className="lead mb-4">
          You do not have permission to view this page.
        </p>

        <Link to="/" className="btn btn-primary px-4">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
