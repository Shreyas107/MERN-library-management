const { addNewBook } = require("./addNewBook");
const { deleteBook } = require("./deleteBook");
const { issueBook } = require("./issueBook");
const { returnBook } = require("./returnBook");
const { searchMembers } = require("./searchMember");
const { getAllIssuedBooks } = require("./showIssuedBooks");
const { updateBook } = require("./updateBook");

module.exports = {
  addNewBook,
  updateBook,
  deleteBook,
  issueBook,
  getAllIssuedBooks,
  returnBook,
  searchMembers,
};
