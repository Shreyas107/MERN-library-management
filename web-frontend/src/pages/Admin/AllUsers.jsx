import React, { useEffect, useState } from "react";
import "../../styles/global.css";
import DisplayUserTable from "../../components/DisplayUserTable";
import { getAllUsers } from "../../services/adminServices";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    role: "",
  });

  useEffect(() => {
    fetchAllUsers();
  }, [filters]);

  const fetchAllUsers = async () => {
    try {
      const result = await getAllUsers(filters);
      if (result?.status === "success") {
        setUsers(result.users || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="d-flex flex-column gap-3">
        {/* Filters
        <div className="fs-3 text-center text-color mb-3">Filters</div> */}

        <div className="d-flex flex-column flex-md-row gap-4">
          {/* Status */}
          <div className="d-flex align-items-center gap-2 flex-fill">
            <label
              htmlFor="status"
              className="form-label mb-0 sub-title"
              style={{ minWidth: "60px" }}
            >
              Status
            </label>

            <select
              id="status"
              className="form-select"
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
            >
              <option value="">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Role */}
          <div className="d-flex align-items-center gap-2 flex-fill">
            <label
              htmlFor="role"
              className="form-label mb-0 sub-title"
              style={{ minWidth: "60px" }}
            >
              Role
            </label>

            <select
              id="role"
              className="form-select"
              value={filters.role}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  role: e.target.value,
                })
              }
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="librarian">Librarian</option>
              <option value="member">Member</option>
            </select>
          </div>
        </div>

        {/* Users list  */}
        <div className="mt-3">
          {users.length > 0 ? (
            <DisplayUserTable users={users} />
          ) : (
            <>
              <hr />
              <p className="text-center fs-5 text-color">No users found.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
