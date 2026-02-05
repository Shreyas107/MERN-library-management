const router = require("express").Router();
const librarianController = require("../controllers/librarian");
const { authorizeRoles } = require("../middlewares/authMiddleware");

// check authorzation
router.use(authorizeRoles("admin", "librarian"));

// POST: issue a book by a librarian
router.post("/issue-book", librarianController.issueBook);

// GET: fetch all issued books
router.get("/all-issued-books", librarianController.getAllIssuedBooks);

// PUT: return a book
router.put("/return-book", librarianController.returnBook);

// GET: search members by name or email
router.get("/members/search", librarianController.searchMembers);

module.exports = router;
