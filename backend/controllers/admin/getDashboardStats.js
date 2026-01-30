const User = require("../../models/User");
const Book = require("../../models/Book");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// GET: fetch admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Users Stats
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    const inactiveUsers = totalUsers - activeUsers;
    const admins = await User.countDocuments({ role: "admin" });

    // Books Stats
    const totalBooksAgg = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: "$totalCopies" },
          availableBooks: { $sum: "$availableCopies" },
        },
      },
    ]);

    let totalBooks = 0;
    let availableBooks = 0;

    if (totalBooksAgg.length > 0) {
      totalBooks = totalBooksAgg[0].totalBooks;
      availableBooks = totalBooksAgg[0].availableBooks;
    }

    const issuedBooks = totalBooks - availableBooks;

    const dashboardData = {
      totalUsers,
      activeUsers,
      inactiveUsers,
      admins,
      totalBooks,
      availableBooks,
      issuedBooks,
    };

    return res.send(successResponse(dashboardData, "dashboardStats"));
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.send(errorResponse(error.message || "Something went wrong!"));
  }
};
