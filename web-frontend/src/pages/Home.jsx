import React, { useEffect, useState } from "react";
import { getAllBooks } from "../services/bookServices";
import BookCard from "../components/BookCard";

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    author: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  // Load books
  const loadBooks = async () => {
    const data = await getAllBooks();
    setAllBooks(data);
    setFilteredBooks(data);

    // Extract unique categories
    const uniqueCats = [
      ...new Set((data || []).flatMap((book) => book.categories || [])),
    ];
    setCategories(uniqueCats);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Apply filtering
  useEffect(() => {
    let result = allBooks;

    if (filters.title) {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(filters.title.toLowerCase()),
      );
    }

    if (filters.author) {
      result = result.filter((book) =>
        book.authors
          .join(", ")
          .toLowerCase()
          .includes(filters.author.toLowerCase()),
      );
    }

    if (filters.category) {
      result = result.filter((book) =>
        book.categories.includes(filters.category),
      );
    }

    setFilteredBooks(result);
  }, [filters, allBooks]);

  return (
    <div className="container mt-5">
      {/* Filters */}
      <div className="card p-3 shadow mb-4">
        <div className="row">
          {/* Title Search */}
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title"
              value={filters.title}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />
          </div>

          {/* Author Search */}
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Author"
              value={filters.author}
              onChange={(e) =>
                setFilters({ ...filters, author: e.target.value })
              }
            />
          </div>

          {/* Category Dropdown */}
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Book Cards */}
      <div className="row g-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
            >
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p className="text-center">No books found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
