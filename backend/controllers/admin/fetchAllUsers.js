const { successResponse, errorResponse } = require("../../utils/apiResponse");
const User = require("../../models/User");

// GET: fetch all users (with optional filters)
exports.fetchAllUsers = async (request, response) => {
  try {
    const { role, status, membership } = request.query;

    let filter = {};

    if (role) filter.role = role;
    if (status) filter.status = status;
    if (membership) filter.membership = membership;

    // exclude passwordHash from results
    const users = await User.find(filter).select("-passwordHash");

    if (!users.length) {
      return response.send(successResponse("No users found"));
    }

    return response.send(successResponse(users, "users"));
  } catch (error) {
    console.log("error", error);
    return response.send(
      errorResponse(error.message || "Something went wrong!")
    );
  }
};
