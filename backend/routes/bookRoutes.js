const router = require("express").Router();
const libController = require("../controllers/librarian");
const commonController = require("../controllers/common");
const {
  addBookValidator,
  updateBookValidator,
  deleteBookValidator,
} = require("../validators/bookValidator");

// GET: fetch all books (optional filter: by title, author, category)
router.get("/all", commonController.fetchAllBooks);

// POST: add new book
router.post("/add", addBookValidator, libController.addNewBook);

// PUT: update a book by its ID
router.put("/update/:bookId", updateBookValidator, libController.updateBook);

// DELETE: deletes a book by ID
router.delete("/delete/:bookId", deleteBookValidator, libController.deleteBook);

module.exports = router;
