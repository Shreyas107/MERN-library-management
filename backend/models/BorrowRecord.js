const mongoose = require("mongoose");

const BorrowRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    returnedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["issued", "returned", "overdue"],
      default: "issued",
      required: true,
    },

    fine: {
      amount: {
        type: Number,
        default: 0,
        min: 0,
      },
      paid: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const BorrowedBook = mongoose.model("BorrowedBook", BorrowRecordSchema);
module.exports = BorrowedBook;
