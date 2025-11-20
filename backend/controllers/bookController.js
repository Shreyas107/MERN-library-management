const Book = require("../models/Book");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const BorrowedBook = require("../models/BorrowRecord");

// GET: fetch all books (optional filter: by title, author, category)
const fetchAllBooks = async (request, response) => {
  try {
    const { title, author, category } = request.query;

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (author) {
      filter.title = { $regex: author, $options: "i" };
    }

    if (category) {
      filter.title = { $regex: category, $options: "i" };
    }

    const books = await Book.find(filter);

    if (books.length === 0)
      return response.send(successResponse(`No book found`));

    return response.send(successResponse(books, "books"));
  } catch (error) {
    console.log("error", error);
    return response.send(
      errorResponse(error.message || "something went wrong!")
    );
  }
};

// POST: add new book
const addNewBook = async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.send(errorResponse(errors.array()));
    }

    const newBook = await Book.create(request.body);
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

// PUT: update a book by its ID
const updateBook = async (request, response) => {
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

// DELETE: deletes a book by ID
const deleteBook = async (request, response) => {
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

module.exports = {
  fetchAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
};
