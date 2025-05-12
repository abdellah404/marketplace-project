import React, { useEffect, useState } from "react";
import axiosService from "../../services/api";
import { toast } from "react-toastify";
import useTheme from "../../hooks/useTheme";
import { Link } from "react-router";
import Loading from "../../components/Loading";
import CategoriesService from "../../services/CategoriesService";

export function Categories() {
  const { isDarkMode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await CategoriesService.categories();
      setCategories(response);
      setError(null);
    } catch (err) {
      setError("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await CategoriesService.deleteCategory(selectedCategory);
      // Both status 200 & 204 are accepted as success responses.
      if (response?.status === 200 || response?.status === 204) {
        toast.success("Category deleted successfully!");
        setCategories(categories.filter(cat => cat.id !== selectedCategory));
        closeModal();
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Error deleting category.");
      toast.error("Error deleting category.");
      closeModal();
    }
  };

  useEffect(() => {
    fetchCategories();
    console.log("categories", categories);
    
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className={`container-fluid p-4 ${isDarkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className={`card ${isDarkMode ? "bg-dark border-secondary" : ""}`}>
        <div className={`card-header d-flex justify-content-between align-items-center p-4 border-bottom ${isDarkMode ? "bg-dark" : ""}`}>
          <h2 className={`mb-0 fw-bold ${isDarkMode ? "text-light" : "text-dark"}`}>Gestion des Categories</h2>
          <Link to="/admin/categories/add" className={`btn ${isDarkMode ? "btn-outline-light" : "btn-outline-primary"}`}>
            Add Category
          </Link>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className={`table table-hover mb-0 ${isDarkMode ? "table-dark" : ""}`}>
              <thead className={`${isDarkMode ? "bg-gray-800" : "bg-light"}`}>
                <tr>
                  <th className="ps-4 py-3">ID</th>
                  <th className="py-3">Name</th>
                  <th className="pe-4 py-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id} className={isDarkMode ? "hover-bg-gray-800" : "hover-bg-gray-100"}>
                      <td className="ps-4 py-3 align-middle">{category.id}</td>
                      <td className="py-3 align-middle fw-medium">{category.name}</td>
                      <td className="pe-4 py-3 align-middle text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <Link
                            to={`/admin/categories/edit/${category.id}`}
                            className={`btn btn-sm ${isDarkMode ? "btn-outline-light" : "btn-outline-primary"} rounded-pill px-3`}
                          >
                            <i className="bi bi-pencil me-1"></i> Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => openModal(category.id)}
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
                        <i className="bi bi-folder fs-1 text-muted mb-2"></i>
                        <p className="text-muted mb-0">No categories found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
                  <p>Are you sure you want to delete this category?</p>
                </div>
                <div className="modal-footer border-top-0">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className={`modal-backdrop fade show ${isDarkMode ? "bg-dark" : ""}`}></div>
        </>
      )}
    </div>
  );
}