import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../styles/global.css";
import bookCover from "../assets/fallback.jpg";

const getInitialImage = (book) => {
  if (book?.ISBN) {
    const cleanISBN = book.ISBN.replace(/[-\s]/g, "");
    return `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg?default=false`;
  }
  return bookCover;
};

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [imgSrc, setImgSrc] = useState(
    book ? getInitialImage(book) : bookCover,
  );

  useEffect(() => {
    if (book) {
      setImgSrc(getInitialImage(book));
    }
  }, [book]);

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
              src={imgSrc}
              alt={book.title}
              className="img-fluid rounded"
              style={{ maxHeight: "320px", objectFit: "cover" }}
              onError={() => setImgSrc(bookCover)}
            />
          </div>

          {/* Right: Book Details */}
          <div className="col-md-8">
            <h3 className="mb-3 sub-title">{book.title}</h3>

            <p className="mb-1">
              <strong>Author(s):</strong> {book.authors?.join(", ")}
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
              <span className="badge bg-info text-dark">
                {book.categories?.join(", ")}
              </span>
            </p>

            <p className="mt-3">{book.description}</p>

            <div className="mt-3">
              <span className="badge bg-info me-2">
                Available: {book.availableCopies}
              </span>
            </div>

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
