const { updateStatus } = require("./updateStatus");
const { fetchAllUsers } = require("./fetchAllUsers");
const { updateRole } = require("./updateRole");
const { getDashboardStats } = require("./getDashboardStats");

module.exports = {
  fetchAllUsers,
  updateRole,
  updateStatus,
  getDashboardStats,
};
