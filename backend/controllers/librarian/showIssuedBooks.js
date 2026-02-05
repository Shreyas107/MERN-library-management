const { successResponse, errorResponse } = require("../../utils/apiResponse");
const BorrowedBook = require("../../models/BorrowRecord");

exports.getAllIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await BorrowedBook.find({ status: "issued" })
      // populate user info
      .populate("userId", "fullName email membership")
      // populate book info
      .populate("bookId", "title authors ISBN")
      // populate librarian (issuedBy)
      .populate("issuedBy", "fullName email")
      // sort by issueDate (descending — newest first)
      .sort({ issueDate: -1 });

    if (!issuedBooks.length) {
      return res.send(successResponse([], "issuedBooks"));
    }

    return res.send(successResponse(issuedBooks, "issuedBooks"));
  } catch (err) {
    console.error("Error in getAllIssuedBooks:", err);
    return res.status(500).send(errorResponse(err.message));
  }
};
