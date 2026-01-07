import "../styles/global.css";

const BookModal = ({ show, onClose, book }) => {
  if (!show || !book) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-color">{book.title}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <p>
                <strong>ISBN:</strong> {book.ISBN}
              </p>
              <p>
                <strong>Authors:</strong> {book.authors.join(", ")}
              </p>
              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p>
                <strong>Year:</strong> {book.publicationYear}
              </p>
              <p>
                <strong>Categories:</strong> {book.categories.join(", ")}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
              <p>
                <strong>Available Copies:</strong> {book.availableCopies}/
                {book.totalCopies}
              </p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      />
    </>
  );
};

export default BookModal;
