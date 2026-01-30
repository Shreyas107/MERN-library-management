import React, { useEffect, useState } from "react";
import { BiCaretUp } from "react-icons/bi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import BookModal from "../../components/BookModal";
import { deleteBook, getAllBooks } from "../../services/bookServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const FetchAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    const result = await getAllBooks();
    setBooks(result);
  };

  const handleDisplayModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleBookDelete = async (bookId) => {
    try {
      const result = await deleteBook(bookId);

      if (result.status !== "success") {
        toast.error(result.error[0].msg);
      }

      toast.success(result.message);
      fetchAllBooks();
      // debugger;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleBookEdit = (book) => {
    navigate("/admin/add-book", { state: { book } });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="shadow table-responsive rounded">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>ISBN</th>
              <th>Authors</th>
              <th>Categories</th>
              <th>Total Copies</th>
              <th>Available Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => {
              return (
                <tr key={b._id} className="align-middle ">
                  <td>{b.title}</td>
                  <td>{b.ISBN}</td>
                  <td>{b.authors}</td>
                  <td>{b.categories.join(", ")}</td>
                  <td className="text-center">{b.totalCopies}</td>
                  <td className="text-center">{b.availableCopies}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        onClick={() => handleDisplayModal(b)}
                        className="btn btn-success btn-sm"
                      >
                        <BiCaretUp />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBookEdit(b)}
                        className="btn btn-warning btn-sm"
                      >
                        <FiEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBookDelete(b._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <BookModal
          show={showModal}
          book={selectedBook}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default FetchAllBooks;
