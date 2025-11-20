const bcrypt = require("bcrypt");

// Hash password before saving
exports.hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

// Compare password for login
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
