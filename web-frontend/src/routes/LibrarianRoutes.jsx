import LibrarianLayout from "../layouts/LibrarianLayout";
import IssueBook from "../pages/Librarian/IssueBook";
import LibHome from "../pages/Librarian/LibHome";

const librarianRoutes = {
  path: "/librarian",
  element: <LibrarianLayout />,
  children: [
    { index: true, element: <LibHome /> },
    { path: "home", element: <LibHome /> },
    { path: "issue-book/:bookId", element: <IssueBook /> },
  ],
};

export default librarianRoutes;
