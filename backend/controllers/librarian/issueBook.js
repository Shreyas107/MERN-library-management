const Book = require("../../models/Book");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const User = require("../../models/User");
const BorrowedBook = require("../../models/BorrowRecord");
const calculateDueDate = require("../../utils/dateUtils");
const membershipRules = require("../../config/membershipRules");

exports.issueBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const issuedBy = req.user.userId;

    // 1. check if user is valid (has membership) and active
    const user = await User.findById(userId);
    if (!user || user.status !== "active") {
      return res.status(400).send(errorResponse("Invalid or inactive user"));
    }

    // 2. check if book is available
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).send(errorResponse("Book not available"));
    }

    // 3. check for  membership rules
    const rules = membershipRules[user.membership];

    // 4. check for currently issued books
    const borrowedCount = await BorrowedBook.countDocuments({
      userId,
      status: "issued",
    });

    if (borrowedCount >= rules.maxBooks) {
      return res.status(400).send(errorResponse("Borrowing limit exceeded"));
    }

    // 5. Issue the book
    book.availableCopies -= 1;
    await book.save();

    const borrowRecord = await BorrowedBook.create({
      userId,
      bookId,
      issuedBy,
      dueDate: calculateDueDate(rules.maxDays),
    });

    return res.status(201).send(successResponse(borrowRecord));
  } catch (err) {
    return res.status(500).send(errorResponse(err.message));
  }
};
