import { Link, useNavigate } from "react-router";
import "../styles/global.css";

const Navbar = () => {
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));
  const user = {
    name: "Shreyas",
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className="navbar bg-info navbar-expand-lg fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid d-flex align-items-center">
        {/* Brand */}
        <Link to="/" className="navbar-brand fs-4 fw-bolder ms-2">
          Book<span className="sub-title">Hive</span>
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link link-color">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Action Buttons */}
        <div className="d-flex align-items-center me-3">
          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-dark dropdown-toggle fw-bold text-white"
                data-bs-toggle="dropdown"
              >
                {user.name || user.email}
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-info">
                <li>
                  <Link
                    className="dropdown-item text-white"
                    to="/update-profile"
                  >
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-white"
                    to="/change-password"
                  >
                    Change Password
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider bg-primary" />
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
