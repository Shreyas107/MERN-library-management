const router = require("express").Router();

const userController = require("../controllers/userController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");

// POST: register a user
router.post("/register", registerValidator, userController.registerUser);

// POST: login a user
router.post("/login", loginValidator, userController.loginUser);

module.exports = router;
