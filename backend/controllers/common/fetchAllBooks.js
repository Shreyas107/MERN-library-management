const Book = require("../../models/Book");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// GET: fetch all books (optional filter: by title, author, category)
exports.fetchAllBooks = async (request, response) => {
  try {
    const { title, author, category } = request.query;

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (author) {
      filter.authors = { $regex: author, $options: "i" };
    }

    if (category) {
      filter.categories = { $regex: category, $options: "i" };
    }

    const books = await Book.find(filter);

    if (books.length === 0)
      return response.send(successResponse("No book found"));

    return response.send(successResponse(books, "books"));
  } catch (error) {
    console.log("error", error);
    return response.send(
      errorResponse(error.message || "something went wrong!")
    );
  }
};
