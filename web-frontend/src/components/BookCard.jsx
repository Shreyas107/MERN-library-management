import React from "react";
import { useNavigate } from "react-router";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate("/book-detail", { state: book });
  };

  return (
    <div className="col-md-3 mb-4 d-flex">
      <div className="card shadow h-100 w-100 d-flex flex-column">
        {/* fetching book covers from openlibaray */}
        <img
          src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`}
          onError={(e) => {
            e.target.src = book.coverImageUrl || "/fallback-book.png";
          }}
          className="card-img-top"
          alt={book.title}
          style={{ height: "250px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          {/* Title */}
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

          {/* Author */}
          <p
            className="card-text mb-3"
            style={{
              minHeight: "38px",
              overflow: "hidden",
            }}
          >
            <strong>Author:</strong> {book.authors?.join(", ")}
          </p>

          {/* Button */}
          <div className="mt-auto">
            <button
              className="btn btn-info text-white w-100"
              onClick={goToDetails}
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
