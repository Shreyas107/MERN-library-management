import AdminLayout from "../layouts/AdminLayout";
import AdminHome from "../pages/Admin/AdminHome";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminHome /> },
    { path: "home", element: <AdminHome /> },
  ],
};

export default adminRoutes;
