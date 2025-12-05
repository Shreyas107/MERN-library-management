import { Link } from "react-router";

const AdminLinks = () => {
  return (
    <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/" className="nav-link link-color">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/manage-users" className="nav-link link-color">
          Manage Users
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/manage-books" className="nav-link link-color">
          Manage Books
        </Link>
      </li>
    </ul>
  );
};

export default AdminLinks;
