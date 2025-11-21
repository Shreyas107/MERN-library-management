const Book = require("../../models/Book");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// PUT: update a book by its ID
exports.updateBook = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.send(errorResponse(errors.array()));
    }

    const { bookId } = request.params;

    const updated = await Book.findByIdAndUpdate(
      bookId,
      { $set: request.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return response.send(errorResponse(`Book not found!`));
    }

    return response.send(successResponse(`Book updated successfully.`));
  } catch (error) {
    console.log("error", error);

    // Handle duplicate ISBN
    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: "ISBN already exists.",
      });
    }

    return response.send(
      errorResponse(error.message || "something went wrong!")
    );
  }
};
