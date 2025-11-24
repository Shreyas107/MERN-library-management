const BorrowedBook = require("../../models/BorrowRecord");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

exports.getMyBorrowHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const history = await BorrowedBook.find({ userId })
      .populate("bookId", "title authors ISBN")
      .sort({ issuedAt: -1 });

    return res.send(successResponse(history, "history"));
  } catch (error) {
    return res.status(500).send(errorResponse(error.message));
  }
};
