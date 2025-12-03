import MemberLayout from "../layouts/MemberLayout";
import MemberHome from "../pages/Member/MemberHome";

const memberRoutes = {
  path: "/member",
  element: <MemberLayout />,
  children: [
    { index: true, element: <MemberHome /> },
    { path: "home", element: <MemberHome /> },
  ],
};

export default memberRoutes;
