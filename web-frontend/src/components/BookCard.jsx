import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import bookCover from "../assets/fallback.jpg";

const getInitialImage = (book) => {
  if (book.coverImageUrl) return book.coverImageUrl;

  if (book?.ISBN) {
    const cleanISBN = book.ISBN.replace(/[-\s]/g, "");
    return `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg?default=false`;
  }

  return bookCover;
};

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(() => getInitialImage(book));

  // Fallback if image request stalls (rate-limit / blocked)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setImgSrc(book.coverImageUrl || bookCover);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [book]);

  const goToDetails = (book) => {
    navigate("/book-details", { state: { book } });
  };

  return (
    <div className="col-md-3 mb-4 d-flex">
      <div className="card shadow h-100 w-100 d-flex flex-column">
        <img
          src={imgSrc}
          alt={book.title}
          loading="lazy"
          onError={() => setImgSrc(bookCover)}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          <h5
            className="card-title"
            style={{
              minHeight: "48px",
              overflow: "hidden",
              color: "slateblue",
              fontWeight: "bold",
            }}
          >
            {book.title}
          </h5>

          <p
            className="card-text mb-3"
            style={{ minHeight: "38px", overflow: "hidden" }}
          >
            <strong>Author:</strong> {book.authors?.join(", ")}
          </p>

          <div className="mt-auto">
            <button
              className="btn btn-info text-white w-100"
              onClick={() => goToDetails(book)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
