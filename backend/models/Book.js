const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    ISBN: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    authors: {
      type: [String],
      required: true,
      trim: true,
    },

    publisher: {
      type: String,
      trim: true,
    },

    publicationYear: {
      type: Number,
      min: 0,
    },

    categories: {
      type: [String],
      default: [],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    coverImageUrl: {
      type: String,
      trim: true,
    },

    totalCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index
BookSchema.index({ title: "text", authors: "text", categories: "text" });

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
