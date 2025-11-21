const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const User = require("../../models/User");
const { hashPassword } = require("../../utils/hash");

// POST: register a user
exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errorResponse(errors.array()));
    }

    const { fullName, email, password, phone } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(errorResponse("Email already registered."));
    }

    // 2. encrypt the password
    const passwordHash = await hashPassword(password);

    // 3. registers the user
    await User.create({ fullName, email, passwordHash, phone });

    return res.send(successResponse("User registered successfully."));
  } catch (error) {
    console.log("error", error);

    // duplicate key error fallback
    if (error.code === 11000) {
      return res.send(errorResponse("Email already registered."));
    }

    return res.send(errorResponse(error.message || "Something went wrong!"));
  }
};
