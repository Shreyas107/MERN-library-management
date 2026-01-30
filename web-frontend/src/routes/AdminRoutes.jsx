import AdminLayout from "../layouts/AdminLayout";
import AddNewBook from "../pages/Admin/AddNewBook";
import AdminHome from "../pages/Admin/AdminHome";
import AllUsers from "../pages/Admin/AllUsers";
import Dashboard from "../pages/Admin/Dashboard";
import FetchAllBooks from "../pages/Admin/FetchAllBooks";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminHome /> },
    { path: "home", element: <AdminHome /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "add-book", element: <AddNewBook /> },
    { path: "fetch-all-books", element: <FetchAllBooks /> },
    { path: "fetch-all-users", element: <AllUsers /> },
  ],
};

export default adminRoutes;
