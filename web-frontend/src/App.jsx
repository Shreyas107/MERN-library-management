import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";

import AdminHome from "./pages/Admin/AdminHome";
import LibrarianLayout from "./layouts/LibrarianLayout";
import LibHome from "./pages/Librarian/LibHome";
import MemberLayout from "./layouts/MemberLayout";
import MemberHome from "./pages/Member/MemberHome";

const App = () => {
  return (
    <div style={{ marginTop: "64px" }}>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
        </Route>

        {/* Librarian Pages */}
        <Route path="/librarian" element={<LibrarianLayout />}>
          <Route index element={<LibHome />} />
          <Route path="home" element={<LibHome />} />
        </Route>

        {/* Member Pages */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<MemberHome />} />
          <Route path="home" element={<MemberHome />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
