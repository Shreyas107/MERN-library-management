const router = require("express").Router();
const bookController = require("../controllers/bookController");
const {
  addBookValidator,
  updateBookValidator,
  deleteBookValidator,
} = require("../validators/bookValidator");

// GET: fetch all books (optional filter: by title, author, category)
router.get("/all", bookController.fetchAllBooks);

// POST: add new book
router.post("/add", addBookValidator, bookController.addNewBook);

// PUT: update a book by its ID
router.put("/update/:bookId", updateBookValidator, bookController.updateBook);

// DELETE: deletes a book by ID
router.delete(
  "/delete/:bookId",
  deleteBookValidator,
  bookController.deleteBook
);

module.exports = router;
