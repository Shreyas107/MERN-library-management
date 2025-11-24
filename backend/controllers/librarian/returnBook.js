const Book = require("../../models/Book");
const User = require("../../models/User");
const BorrowedBook = require("../../models/BorrowRecord");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const membershipRules = require("../../config/membershipRules");

exports.returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const receivedBy = req.user.userId;

    // 1. Validate user
    const user = await User.findById(userId);
    if (!user || user.status !== "active") {
      return res.status(400).send(errorResponse("Invalid or inactive user"));
    }

    // 2. Check borrow record
    const borrowRecord = await BorrowedBook.findOne({
      userId,
      bookId,
      status: "issued",
    });

    if (!borrowRecord) {
      return res.status(400).send(errorResponse("No issued record found"));
    }

    // 3. Check book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).send(errorResponse("Book not found"));
    }

    // 4. Fine calculation
    let fine = 0;
    const today = new Date();

    if (today > borrowRecord.dueDate) {
      const daysLate = Math.ceil(
        (today - borrowRecord.dueDate) / (1000 * 60 * 60 * 24)
      );

      const rules = membershipRules[user.membership];
      fine = daysLate * rules.finePerDay;
    }

    // 5. Update borrow record
    borrowRecord.returnedAt = today;
    borrowRecord.status = "returned";
    borrowRecord.receivedBy = receivedBy;
    borrowRecord.fine = fine;

    await borrowRecord.save();

    // 6. Increment available copies
    book.availableCopies += 1;
    await book.save();

    return res.send(
      successResponse(
        {
          message: "Book returned successfully",
          fine,
          borrowRecord,
        },
        "returnInfo"
      )
    );
  } catch (error) {
    return res.status(500).send(errorResponse(error.message));
  }
};
