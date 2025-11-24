const BorrowedBook = require("../../models/BorrowRecord");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

exports.getMyIssuedBooks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const issuedBooks = await BorrowedBook.find({
      userId,
      status: "issued",
    })
      .populate("bookId", "title authors ISBN")
      .sort({ issuedAt: -1 });

    if (issuedBooks.length === 0) {
      return res.send(successResponse(`Currently no book is issued by you.`));
    }

    return res.send(successResponse(issuedBooks, "issuedBooks"));
  } catch (error) {
    return res.status(500).send(errorResponse(error.message));
  }
};
