import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import UserModal from "./UserModal";
import { updateUserRole, updateUserStatus } from "../services/adminServices";

const DisplayUserTable = ({ users = [] }) => {
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleDisplayModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = async ({ _id, role, status }) => {
    try {
      const updates = [];

      if (role !== selectedUser.role) {
        updates.push(updateUserRole(_id, role));
      }

      if (status !== selectedUser.status) {
        updates.push(updateUserStatus(_id, status));
      }

      if (updates.length === 0) {
        toast.info("No changes to update");
        setShowModal(false);
        return;
      }

      await Promise.all(updates);

      setUserList((prev) =>
        prev.map((u) => (u._id === _id ? { ...u, role, status } : u)),
      );

      toast.success("User updated successfully ✅");
      setShowModal(false);
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update user ❌");
    }
  };

  const handleDeleteUser = (userId) => {
    console.log("handleDeleteUser: ", userId);
    setUserList((prev) => prev.filter((u) => u._id !== userId));

    toast.success("User removed successfully 🗑️");
  };

  return (
    <div className="table-responsive rounded shadow">
      <table className="table table-hover table-striped align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: "15%" }}>Name</th>
            <th style={{ width: "20%" }}>Email</th>
            <th style={{ width: "15%" }}>Phone</th>
            <th style={{ width: "10%" }}>Role</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "15%" }}>Membership</th>
            <th style={{ width: "15%" }} className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td className="text-break">{user.email}</td>
                <td>{user.phone || "-"}</td>
                <td className="text-capitalize">{user.role}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{user.membership || "-"}</td>
                <td className="text-center">
                  <div className="btn-group">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleDisplayModal(user)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-3">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <UserModal
        show={showModal}
        user={selectedUser}
        onClose={() => setShowModal(false)}
        handleUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default DisplayUserTable;
