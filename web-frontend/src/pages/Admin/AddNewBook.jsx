import React, { useState } from "react";
import TagsInput from "../../components/TagsInput";
import { addNewBook } from "../../services/bookServices";
import { toast } from "react-toastify";

const AddNewBook = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [authors, setAuthors] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      ISBN: isbn,
      authors,
      publisher,
      publicationYear: Number(publicationYear),
      categories,
      description,
      totalCopies: Number(totalCopies),
    };

    try {
      const result = await addNewBook(bookData);
      console.log("result: ", result);

      if (result.status === "success") {
        toast.success(result.message);
      } else {
        // Extract error message from string OR array format
        const msg = Array.isArray(result.error)
          ? result.error[0].msg
          : result.error;

        throw new Error(msg);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log("Add Book Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-80 mt-5">
      <div className="card shadow p-4" style={{ width: "550px" }}>
        <h3 className="text-center mb-4 text-color">Add New Book</h3>

        <form onSubmit={handleAddBook}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              placeholder="Enter book name"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* ISBN */}
          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              placeholder="Enter ISBN number"
              className="form-control"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </div>

          {/* Authors (Tags Input) */}
          <TagsInput label="Authors" tags={authors} setTags={setAuthors} />

          {/* Publisher */}
          <div className="mb-3">
            <label className="form-label">Publisher</label>
            <input
              type="text"
              placeholder="Enter publisher's name"
              className="form-control"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              required
            />
          </div>

          {/* Publication Year */}
          <div className="mb-3">
            <label className="form-label">Publication Year</label>
            <input
              type="number"
              placeholder="Enter released year"
              className="form-control"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              required
            />
          </div>

          {/* Categories (Tags Input) */}
          <TagsInput
            label="Categories"
            tags={categories}
            setTags={setCategories}
          />

          {/* Total Copies */}
          <div className="mb-3">
            <label className="form-label">Total Copies</label>
            <input
              type="number"
              placeholder="Enter total copies"
              className="form-control"
              value={totalCopies}
              onChange={(e) => setTotalCopies(e.target.value)}
              required
            />
          </div>

          {/* TODO: Book cover URL */}

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter book description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-info text-white w-50">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
