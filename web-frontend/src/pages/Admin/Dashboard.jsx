import React, { useEffect, useState } from "react";
import { dashboardStats } from "../../services/adminServices";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    admins: 0,
    totalBooks: 0,
    availableBooks: 0,
    issuedBooks: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardStats();

      if (response.status === "success" && response.dashboardStats) {
        setStats(response.dashboardStats);
      } else {
        toast.error("Failed to fetch dashboard stats ❌");
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load dashboard data ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="container py-4">Loading dashboard...</div>;
  }

  // Gradient + shadow styles
  const cardStyle = {
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    padding: "20px",
    minHeight: "120px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  };

  return (
    <div className="container-fluid py-4">
      <h3 className="mb-4 fw-bold">Admin Dashboard</h3>

      {/* User Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            }}
          >
            <div>
              <h6>Total Users</h6>
              <h3 className="fw-bold">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #11998e, #38ef7d)",
            }}
          >
            <div>
              <h6>Active Users</h6>
              <h3 className="fw-bold">{stats.activeUsers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #757f9a, #d7dde8)",
              color: "#333",
            }}
          >
            <div>
              <h6>Inactive Users</h6>
              <h3 className="fw-bold">{stats.inactiveUsers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            }}
          >
            <div>
              <h6>Admins</h6>
              <h3 className="fw-bold">{stats.admins}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Book Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #f7971e, #ffd200)",
              color: "#333",
            }}
          >
            <div>
              <h6>Total Books</h6>
              <h3 className="fw-bold">{stats.totalBooks}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #43cea2, #185a9d)",
            }}
          >
            <div>
              <h6>Available Books</h6>
              <h3 className="fw-bold">{stats.availableBooks}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              ...cardStyle,
              background: "linear-gradient(135deg, #ff4b1f, #1fddff)",
            }}
          >
            <div>
              <h6>Issued Books</h6>
              <h3 className="fw-bold">{stats.issuedBooks}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
