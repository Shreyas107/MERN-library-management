const Book = require("../../models/Book");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// POST: add new book
exports.addNewBook = async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.send(errorResponse(errors.array()));
    }

    const { totalCopies, ...otherFields } = request.body;

    const bookData = {
      ...otherFields,
      totalCopies,
      availableCopies: totalCopies,
    };

    console.log("bookData", bookData);

    const newBook = await Book.create(bookData);
    return response.send(successResponse(`Book added successfully.`));
  } catch (error) {
    console.log("error", error);

    // handle duplicate book error
    if (error.code === 11000) {
      return response.send(errorResponse(`Book already exists with this ISBN`));
    }
    return response.send(
      errorResponse(error.message || "something went wrong!")
    );
  }
};
