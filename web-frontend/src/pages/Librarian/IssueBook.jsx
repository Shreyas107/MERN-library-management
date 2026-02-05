import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { issueBook, searchMembers } from "../../services/librarianServices";

const IssueBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle member search
  const handleSearch = async (value) => {
    setSearch(value);

    if (value.length < 2) {
      setMembers([]);
      return;
    }

    try {
      const res = await searchMembers(value);
      console.log("res: ", res);

      setMembers(res.message || []);
    } catch {
      toast.error("Failed to search members");
    }
  };

  // Handle issuing book
  const handleIssue = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return toast.error("Please select a member");
    }

    try {
      setLoading(true);
      const res = await issueBook({
        bookId,
        userId: selectedUser._id,
      });

      if (res.status === "success") {
        toast.success("Book issued successfully 📚");
        navigate("/home");
      }
    } catch (err) {
      const apiMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Issue failed";

      toast.error(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow p-4" style={{ width: "480px" }}>
        <h5 className="mb-4 fw-bold text-center">Issue Book</h5>

        <form onSubmit={handleIssue}>
          {/* Book ID */}
          <div className="mb-3">
            <label className="form-label">Book ID</label>
            <input className="form-control" value={bookId} disabled />
          </div>

          {/* Member Search */}
          <div className="mb-3">
            <label className="form-label">Search Member</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Search Results with full member details */}
          {members.length > 0 && (
            <ul className="list-group mb-3">
              {members.map((m) => (
                <li
                  key={m._id}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSelectedUser(m);
                    setMembers([]);
                    setSearch(m.fullName);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <strong>Name:</strong> {m.fullName}
                  </div>
                  <div>
                    <strong>Email:</strong> {m.email}
                  </div>
                  <div>
                    <strong>Membership:</strong> {m.membership}
                  </div>
                  <div>
                    <strong>Status:</strong> {m.status}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Selected Member */}
          {selectedUser && (
            <div className="alert alert-info py-2">
              Selected: <strong>{selectedUser.fullName}</strong> (
              {selectedUser.membership})
            </div>
          )}

          <button
            className="btn btn-primary w-100"
            disabled={loading || !selectedUser}
          >
            {loading ? "Issuing..." : "Issue Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueBook;
