import React, { useMemo, useState } from "react";
import DisplayUserTable from "../../components/DisplayUserTable";
const mockUsers = [
  {
    _id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    role: "admin",
    status: "active",
    membership: "Gold",
  },
  {
    _id: "2",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "9123456789",
    role: "user",
    status: "active",
    membership: "Silver",
  },
  {
    _id: "3",
    fullName: "Alex Brown",
    email: "alex@example.com",
    phone: "",
    role: "user",
    status: "inactive",
    membership: "Free",
  },
  {
    _id: "4",
    fullName: "Emily Clark",
    email: "emily@example.com",
    phone: "9988776655",
    role: "user",
    status: "active",
    membership: "Platinum",
  },
];

const Dashboard = () => {
  const [users, setUsers] = useState(mockUsers);

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      inactive: users.filter((u) => u.status === "inactive").length,
      admins: users.filter((u) => u.role === "admin").length,
    };
  }, [users]);

  return (
    <div className="container-fluid py-4">
      <h3 className="mb-4 fw-bold">Admin Dashboard</h3>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Users</h6>
              <h3 className="fw-bold">{stats.total}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Active Users</h6>
              <h3 className="fw-bold text-success">{stats.active}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Inactive Users</h6>
              <h3 className="fw-bold text-secondary">{stats.inactive}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Admins</h6>
              <h3 className="fw-bold text-primary">{stats.admins}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="mb-3">Users</h5>
          <DisplayUserTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
