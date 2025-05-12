import React, { useState, useEffect } from "react";
import axiosService from "../../services/api.js";
import useTheme from "../../hooks/useTheme.js";
import { Link } from "react-router";
import Loading from "../../components/Loading.jsx";

export function Users() {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosService.get("/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (userId) => {
    setSelectedUser(userId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    try {
      await axiosService.delete(`/users/${selectedUser}`);
      setUsers(users.filter((user) => user.id !== selectedUser));
      toast.success("User deleted successfully!");
      closeModal();
    } catch (err) {
      setError("Error deleting user.");
      toast.error("Error deleting user.");
      closeModal();
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return (
    <Loading/>
  );

  if (error) return (
    <div className="alert alert-danger mx-auto mt-5" style={{ maxWidth: '600px' }}>
      {error}
    </div>
  );

  return (
    <div className={`container-fluid p-4 ${isDarkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className={`card ${isDarkMode ? "bg-dark border-secondary" : ""}`}>
      <div className={`card-header d-flex justify-content-between align-items-center p-4 border-bottom ${isDarkMode ? "bg-dark" : ""}`}>
  <h2 className={`mb-0 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Gestion des Utilisateurs</h2>
  <div className="d-flex gap-3">
    <div className="input-group" style={{ width: '300px' }}>
      <span className={`input-group-text ${isDarkMode ? "bg-dark border-secondary text-light" : ""}`}>
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className={`form-control shadow-none ${isDarkMode ? "bg-dark border-secondary text-light" : ""}`}
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>
</div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className={`table table-hover mb-0 ${isDarkMode ? "table-dark" : ""}`}>
              <thead className={`${isDarkMode ? "bg-gray-800" : "bg-light"}`}>
                <tr>
                  <th className="ps-4 py-3">ID</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Email</th>
                  <th className="pe-4 py-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className={isDarkMode ? "hover-bg-gray-800" : "hover-bg-gray-100"}>
                      <td className="ps-4 py-3 align-middle">{user.id}</td>
                      <td className="py-3 align-middle fw-medium">{user.name}</td>
                      <td className={`py-3 align-middle ${isDarkMode ? "text-gray-300" : "text-muted"}`}>
                        {user.email}
                      </td>                      <td className="pe-4 py-3 align-middle text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <Link 
                            to={`/admin/users/${user.id}`} 
                            className={`btn btn-sm ${isDarkMode ? "btn-outline-light" : "btn-outline-primary"} rounded-pill px-3`}
                          >
                            <i className="bi bi-eye me-1"></i> View Annonces
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => openModal(user.id)}
                          >
                            <i className="bi bi-trash me-1"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <div className="d-flex flex-column align-items-center">
                        <i className="bi bi-people fs-1 text-muted mb-2"></i>
                        <p className="text-muted mb-0">No users found</p>
                        {searchTerm && (
                          <button 
                            className="btn btn-link text-primary mt-2"
                            onClick={() => setSearchTerm("")}
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center p-3 border-top">
          <div className="text-muted small">
            Showing <span className="fw-bold">{filteredUsers.length}</span> of <span className="fw-bold">{users.length}</span> users
          </div>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2">
              <i className="bi bi-arrow-left"></i>
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
  <>
    <div className="modal fade show d-block" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${isDarkMode ? "bg-dark text-light" : ""}`}>
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="modal-footer border-top-0">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
    {/* Modal Backdrop applied based on dark mode */}
    <div className={`modal-backdrop fade show ${isDarkMode ? "bg-dark" : ""}`}></div>
  </>
)}
      

    </div>
  );
}