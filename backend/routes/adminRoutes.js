const router = require("express").Router();
const adminController = require("../controllers/admin");
const { checkAuthorization } = require("../middlewares/authMiddleware");
const {
  updateRoleValidator,
  updateStatusValidator,
} = require("../validators/adminValidator");

// check authorzation
router.use(checkAuthorization);

// GET: fetch all users (optional filter)
router.get("/users/all", adminController.fetchAllUsers);

// PATCH: update role of a user by Id
router.patch(
  "/update/role/:userId",
  updateRoleValidator,
  adminController.updateRole
);

// PATCH: update status of a user by Id
router.patch(
  "/update/status/:userId",
  updateStatusValidator,
  adminController.updateStatus
);

module.exports = router;
