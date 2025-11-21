const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const User = require("../../models/User");

// PATCH: update role of a user by Id
exports.updateRole = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.send(errorResponse(errors.array()));
    }

    const { userId } = request.params;
    const { role } = request.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return response.send(errorResponse(`User not found with Id: ${userId}`));
    }

    return response.send(successResponse("User role updated successfully."));
  } catch (error) {
    console.log("error", error);
    return response.send(errorResponse(error.message));
  }
};
