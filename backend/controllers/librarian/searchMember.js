const User = require("../../models/User");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

exports.searchMembers = async (req, res) => {
  try {
    const { q } = req.query;

    // If query is too short, return empty list
    if (!q || q.trim().length < 2) {
      return res.send(successResponse([]));
    }

    const regex = new RegExp(q, "i");

    const members = await User.find({
      role: "member",
      status: "active",
      $or: [{ fullName: regex }, { email: regex }],
    })
      .select("_id fullName email membership status")
      .limit(10)
      .lean();

    return res.send(successResponse(members));
  } catch (error) {
    console.error("Search member error:", error);
    return res.status(500).send(errorResponse("Failed to search members"));
  }
};
