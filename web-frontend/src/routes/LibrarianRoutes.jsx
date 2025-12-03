import LibrarianLayout from "../layouts/LibrarianLayout";
import LibHome from "../pages/Librarian/LibHome";

const librarianRoutes = {
  path: "/librarian",
  element: <LibrarianLayout />,
  children: [
    { index: true, element: <LibHome /> },
    { path: "home", element: <LibHome /> },
  ],
};

export default librarianRoutes;
