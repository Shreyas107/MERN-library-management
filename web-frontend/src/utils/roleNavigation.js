export const navigateByRole = (role, navigate, toast) => {
  switch (role) {
    case "admin":
      navigate("/admin/home");
      break;

    case "librarian":
      navigate("/librarian/home");
      break;

    case "member":
      navigate("/member/home");
      break;

    default:
      toast?.error("Invalid user role!");
      break;
  }
};
