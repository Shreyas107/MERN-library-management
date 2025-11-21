const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const User = require("../../models/User");

// PATCH: update status of a user by its ID
exports.updateStatus = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.send(errorResponse(errors.array()));
    }

    const { userId } = request.params;
    const { status } = request.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return response.send(errorResponse(`User not found with Id: ${userId}`));
    }

    return response.send(successResponse("User status updated successfully."));
  } catch (error) {
    console.log("error", error);
    return response.send(errorResponse(error.message));
  }
};
