import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

import adminRoutes from "./AdminRoutes";
import librarianRoutes from "./LibrarianRoutes";
import memberRoutes from "./MemberRoutes";
import { useSelector } from "react-redux";
import Unauthorized from "../pages/UnAuthorized";
import BookDetails from "../pages/BookDetails";

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user: ", user);

  const isAuthenticated = !!user;
  const userRole = user?.role;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Protected */}
      <Route
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["admin"]}
            userRole={userRole}
          />
        }
      >
        <Route path={adminRoutes.path} element={adminRoutes.element}>
          {adminRoutes.children.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Route>
      </Route>

      {/* Librarian Protected */}
      <Route
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["librarian", "admin"]}
            userRole={userRole}
          />
        }
      >
        <Route path={librarianRoutes.path} element={librarianRoutes.element}>
          {librarianRoutes.children.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Route>
      </Route>

      {/* Member Protected */}
      <Route
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["member"]}
            userRole={userRole}
          />
        }
      >
        <Route path={memberRoutes.path} element={memberRoutes.element}>
          {memberRoutes.children.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
