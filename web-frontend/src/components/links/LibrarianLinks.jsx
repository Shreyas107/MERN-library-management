import { Link } from "react-router";

const LibrarianLinks = () => {
  return (
    <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/" className="nav-link link-color">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/librarian/issued-books" className="nav-link link-color">
          Issued Books
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/librarian/add-book" className="nav-link link-color">
          Add Book
        </Link>
      </li>
    </ul>
  );
};

export default LibrarianLinks;
