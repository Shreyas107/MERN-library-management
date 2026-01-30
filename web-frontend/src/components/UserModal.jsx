import React, { useEffect, useState } from "react";

const UserModal = ({ show, onClose, user, handleUpdate }) => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setStatus(user.status);
    }
  }, [user]);

  if (!show || !user) return null;

  const onSubmit = (e) => {
    e.preventDefault();

    handleUpdate({
      _id: user._id,
      role,
      status,
    });
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-md">
          <div className="modal-content rounded-3">
            <form onSubmit={onSubmit}>
              <div className="modal-header">
                <h5 className="modal-title text-color">
                  Update User Role and Status
                </h5>
                <button className="btn-close" onClick={onClose} />
              </div>

              <div className="modal-body">
                {/* Read-only fields */}
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    value={user.fullName}
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={user.email} disabled />
                </div>

                <div className="mb-2">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    value={user.phone || "-"}
                    disabled
                  />
                </div>

                {/* Editable fields */}
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="librarian">Librarian</option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
};

export default UserModal;
