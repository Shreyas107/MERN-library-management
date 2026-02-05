import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllIssuedBooks,
  returnBook,
} from "../../services/librarianServices";

import { FaUndoAlt, FaBook, FaUser, FaCalendarAlt } from "react-icons/fa";

import "../../styles/issuedBooks.css";

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      setLoading(true);
      const res = await getAllIssuedBooks();
      if (res.status === "success") {
        setIssuedBooks(res.issuedBooks || []);
      } else {
        toast.error("Failed to fetch issued books");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching issued books");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (record) => {
    const confirm = window.confirm(
      `Return "${record.bookId.title}" from ${record.userId.fullName}?`,
    );
    if (!confirm) return;

    try {
      await returnBook({
        userId: record.userId._id,
        bookId: record.bookId._id,
      });
      toast.success("Book returned successfully 📖");
      fetchIssuedBooks();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Return failed");
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-50">
        <h5 className="text-secondary">Fetching issued books...</h5>
      </div>
    );
  }

  if (!issuedBooks.length) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-50">
        <h5 className="text-muted">No issued books found yet.</h5>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold text-center">
        <FaBook className="me-2" /> All Issued Books
      </h3>

      <div className="table-responsive table-container">
        <table className="table table-hover rounded-table">
          <thead className="table-dark">
            <tr>
              <th>Book</th>
              <th>Member</th>
              <th>Issued By</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Fine</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issuedBooks.map((ib) => (
              <tr key={ib._id}>
                {/* Book Details */}
                <td>
                  <strong>{ib.bookId?.title}</strong>
                  <div className="text-muted">ISBN: {ib.bookId?.ISBN}</div>
                </td>

                {/* Member Details */}
                <td>
                  <FaUser className="me-1 text-secondary" />
                  <strong>{ib.userId?.fullName}</strong>
                  <div className="text-muted">{ib.userId?.email}</div>
                </td>

                {/* Issued By (Librarian) */}
                <td>{ib.issuedBy?.email}</td>

                {/* Issue & Due Dates */}
                <td>
                  <div>
                    <FaCalendarAlt className="me-1 text-secondary" />
                    {new Date(ib.issueDate).toLocaleDateString()}
                  </div>
                  <div className="text-muted">
                    <FaCalendarAlt className="me-1 text-secondary" />
                    {new Date(ib.dueDate).toLocaleDateString()}
                  </div>
                </td>

                {/* Status */}
                <td>{ib.status}</td>

                {/* Fine */}
                <td>
                  {ib.fine?.amount}{" "}
                  {ib.fine?.paid ? (
                    <span className="badge bg-success">Paid</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Unpaid</span>
                  )}
                </td>

                {/* Return Action */}
                <td>
                  {ib.status === "issued" && (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleReturn(ib)}
                    >
                      <FaUndoAlt className="me-1" /> Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedBooks;
