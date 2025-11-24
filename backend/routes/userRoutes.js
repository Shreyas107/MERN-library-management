const router = require("express").Router();

const userController = require("../controllers/common");
const memberController = require("../controllers/user");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");

// POST: register a user
router.post("/register", registerValidator, userController.registerUser);

// POST: login a user
router.post("/login", loginValidator, userController.loginUser);

// GET: get my issued books
router.get("/my/issued-books", memberController.getMyIssuedBooks);

// GET: get my borrowed books history
router.get("/my/history", memberController.getMyBorrowHistory);

module.exports = router;
