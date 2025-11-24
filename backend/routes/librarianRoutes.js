const router = require("express").Router();
const librarianController = require("../controllers/librarian");

// POST: issue a book by a librarian
router.post("/issue-book", librarianController.issueBook);

// GET: fetch all issued books
router.get("/all-issued-books", librarianController.getAllIssuedBooks);

// PUT: return a book
router.put("/return-book", librarianController.returnBook);

module.exports = router;
