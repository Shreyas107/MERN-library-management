const { body, param } = require("express-validator");

exports.addBookValidator = [
  body("title").notEmpty().withMessage("Title is required."),

  body("ISBN").notEmpty().withMessage("ISBN is required."),

  body("authors")
    .isArray({ min: 1 })
    .withMessage("Atleast one Author name is required."),

  body("totalCopies")
    .isInt({ min: 0 })
    .withMessage("Total copies must be a positive number."),

  body("publicationYear")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Publication year must be a valid year."),
];

exports.updateBookValidator = [
  body("title").optional().isString().trim(),
  body("ISBN").optional().isString().trim(),
  body("authors").optional().isArray().withMessage("Authors must be an array"),
  body("publisher").optional().isString().trim(),
  body("publicationYear")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Year must be valid"),
  body("categories").optional().isArray(),
  body("description").optional().isString().trim(),
  body("coverImageUrl").optional().isString().trim(),
  body("totalCopies").optional().isInt({ min: 0 }),
  body("availableCopies").optional().isInt({ min: 0 }),
];

exports.deleteBookValidator = [
  param("bookId")
    .notEmpty()
    .withMessage("bookId is required!")
    .isMongoId()
    .withMessage("Invalid bookId format!"),
];
