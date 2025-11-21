const Book = require("../../models/Book");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const BorrowedBook = require("../../models/BorrowRecord");

// DELETE: deletes a book by ID
exports.deleteBook = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) return response.send(errorResponse(errors.array()));

    const { bookId } = request.params;

    const issued = await BorrowedBook.findOne({
      bookId,
      status: "issued",
    });

    if (issued) {
      return response.send(
        errorResponse("Cannot delete a book that is currently issued.")
      );
    }

    const deleteBook = await Book.findByIdAndDelete(bookId);

    if (!deleteBook)
      return response.send(errorResponse(`Book not found with ID: ${bookId}`));

    return response.send(successResponse(`Book deleted successfully.`));
  } catch (error) {
    console.log("error", error);
    return response.send(
      errorResponse(error.message || "something went wrong!")
    );
  }
};
