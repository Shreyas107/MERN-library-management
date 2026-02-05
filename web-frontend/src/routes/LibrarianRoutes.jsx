import LibrarianLayout from "../layouts/LibrarianLayout";
import IssueBook from "../pages/Librarian/IssueBook";
import IssuedBooks from "../pages/Librarian/IssuedBooks";
import LibHome from "../pages/Librarian/LibHome";

const librarianRoutes = {
  path: "/librarian",
  element: <LibrarianLayout />,
  children: [
    { index: true, element: <LibHome /> },
    { path: "home", element: <LibHome /> },
    { path: "issue-book/:bookId", element: <IssueBook /> },
    { path: "issued-books", element: <IssuedBooks /> },
  ],
};

export default librarianRoutes;
