const { body, param } = require("express-validator");

exports.updateRoleValidator = [
  param("userId").isMongoId().withMessage("Invalid User ID"),
  body("role")
    .isIn(["admin", "librarian", "member"])
    .withMessage("Invalid user role"),
];

exports.updateStatusValidator = [
  param("userId").isMongoId().withMessage("Invalid User ID"),
  body("status").isIn(["active", "inactive"]).withMessage("Invalid status"),
];
