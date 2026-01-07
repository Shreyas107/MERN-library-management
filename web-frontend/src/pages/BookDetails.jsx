import React from "react";
import { useLocation, useNavigate } from "react-router";
import "../styles/global.css";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  if (!book) {
    return (
      <div className="container mt-5 text-center">
        <p>Book details not available.</p>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-3">
        <div className="row g-4 align-items-center">
          {/* Left: Book Cover */}
          <div className="col-md-4 text-center">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="img-fluid rounded"
              style={{ maxHeight: "320px", objectFit: "cover" }}
            />
          </div>

          {/* Right: Book Details */}
          <div className="col-md-8">
            <h3 className="mb-3 sub-title">{book.title}</h3>

            <p className="mb-1">
              <strong>Author(s):</strong> {book.authors.join(", ")}
            </p>

            <p className="mb-1">
              <strong>ISBN:</strong> {book.ISBN}
            </p>

            <p className="mb-1">
              <strong>Publisher:</strong> {book.publisher}
            </p>

            <p className="mb-1">
              <strong>Published:</strong> {book.publicationYear}
            </p>

            <p className="mb-1">
              <strong>Categories:</strong>{" "}
              <span className="badge bg-info text-dark me-1">
                {book.categories.join(", ")}
              </span>
            </p>

            <p className="mt-3">{book.description}</p>

            <div className="mt-3">
              <span className="badge bg-info me-2">
                Available: {book.availableCopies}
              </span>
            </div>

            {/* Optional Back Button */}
            <div className="mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
