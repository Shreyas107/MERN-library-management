const { validationResult } = require("express-validator");
const { errorResponse } = require("../../utils/apiResponse");
const User = require("../../models/User");
const { generateToken } = require("../../utils/token");
const { comparePassword } = require("../../utils/hash");

// POST: login user
exports.loginUser = async (request, response) => {
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
      message: "Log in successfull",
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
