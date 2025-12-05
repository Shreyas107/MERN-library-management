import { Link } from "react-router";

const MemberLinks = () => {
  return (
    <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/" className="nav-link link-color">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/my-books" className="nav-link link-color">
          My Books
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/browse-books" className="nav-link link-color">
          Browse Books
        </Link>
      </li>
    </ul>
  );
};

export default MemberLinks;
