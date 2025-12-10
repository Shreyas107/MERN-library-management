import { Link } from "react-router";

const AdminLinks = () => {
  return (
    <div className="d-flex align-items-center ">
      {/* Dashboard Link */}
      <div>
        <Link
          className="dropdown-item text-white fw-bold mx-2 nav-link link-color"
          to="/admin/dashboard"
        >
          Dashboard
        </Link>
      </div>

      {/* Book dropdown */}
      <div className="dropdown mx-2">
        <button
          className="btn  dropdown-toggle fw-bold text-white nav-link link-color"
          data-bs-toggle="dropdown"
        >
          Books
        </button>
        <ul className="dropdown-menu dropdown-menu-center bg-info">
          <li>
            <Link
              className="dropdown-item text-white"
              to="/admin/fetch-all-books"
            >
              Fetch all books
            </Link>
          </li>
          <li>
            <Link className="dropdown-item text-white" to="/admin/add-book">
              Add Book
            </Link>
          </li>
        </ul>
      </div>

      {/* User dropdown */}
      <div className="dropdown mx-2">
        <button
          className="btn  dropdown-toggle fw-bold text-white nav-link link-color"
          data-bs-toggle="dropdown"
        >
          Users
        </button>
        <ul className="dropdown-menu dropdown-menu-center bg-info">
          <li>
            <Link
              className="dropdown-item text-white"
              to="/admin/fetch-all-users"
            >
              Fetch all users
            </Link>
          </li>
          {/* <li>
            <Link className="dropdown-item text-white" to="/add-book">
              Add Book
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default AdminLinks;
