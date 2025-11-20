const Book = require("../models/Book");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const User = require("../models/User");
const { generateToken } = require("../utils/token");
const { hashPassword, comparePassword } = require("../utils/hash");

// POST: register a user
const registerUser = async (req, res) => {
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

// POST: login a user
const loginUser = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return res.send(errorResponse(errors.array()));
    }

    const { email, password } = request.body;

    // 1. find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return response.send(errorResponse(`Invalid email or password!`));
    }

    // 2. compare plain password with hashed password
    const isMatch = await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      return response.send(errorResponse(`Invalid email or password!`));
    }

    // 3. generate token
    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    // user object without hash password
    const userInfo = {
      userId: user._id,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      membership: user.membership,
    };

    return response.send({
      status: "success",
      message: "Logged in successful",
      token,
      user: userInfo,
    });
  } catch (error) {
    console.log("error", error);
    return response.send(
      errorResponse(error.message || "something went wrong!")
    );
  }
};

module.exports = { registerUser, loginUser };
