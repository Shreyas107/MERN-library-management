const { successResponse, errorResponse } = require("../../utils/apiResponse");

const BorrowedBook = require("../../models/BorrowRecord");

exports.getAllIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await BorrowedBook.find({ status: "issued" })
      .populate("userId", "name email membership")
      .populate("bookId", "title authors ISBN")
      .populate("issuedBy", "name email")
      .sort({ issuedAt: -1 });

    if (issuedBooks.length === 0) {
      return res.send(successResponse("No issued books found"));
    }

    return res.send(successResponse(issuedBooks, "issuedBooks"));
  } catch (err) {
    return res.status(500).send(errorResponse(err.message));
  }
};
