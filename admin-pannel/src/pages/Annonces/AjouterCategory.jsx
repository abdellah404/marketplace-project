import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useTheme from "../../hooks/useTheme";
import CategoriesService from "../../services/CategoriesService";

export function AjouterCategory() {
  const { isDarkMode } = useTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    try {
      setLoading(true);
      const response = await CategoriesService.addCategory({
        name,
        description: description || null,
      });

      // Accept success if status 200 or 201, or if response.data.id exists
      if (
        (response && (response.status === 200 || response.status === 201)) ||
        (response.data && response.data.id)
      ) {
        toast.success("Category added successfully!");
        navigate("/admin/categories");
      } else {
        toast.error(response.data?.message || "Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Error adding category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={` d-flex align-items-center justify-content-center`}>
      <div className={`w-100`} style={{ maxWidth: 480 }}>
        <div className={`card shadow-lg border-0 rounded-4 p-4 ${isDarkMode ? "bg-dark text-light" : "bg-white"}`}>
          <h2 className={`mb-4 fw-bold text-center ${isDarkMode ? "text-light" : "text-dark"}`}>
            Ajouter Category
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? "text-light" : "text-dark"}`}>
                Name
              </label>
              <input
                type="text"
                className={`form-control rounded-3 px-4 py-2 border-0 shadow-sm ${isDarkMode ? "bg-secondary text-light" : "bg-light text-dark"} 
                  focus-ring focus-ring-primary`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Category name"
                style={{ fontSize: "1rem" }}
              />
            </div>
            <div className="mb-4">
              <label className={`form-label fw-semibold ${isDarkMode ? "text-light" : "text-dark"}`}>
                Description
              </label>
              <textarea
                className={`form-control rounded-3 px-4 py-2 border-0 shadow-sm ${isDarkMode ? "bg-secondary text-light" : "bg-light text-dark"} 
                  focus-ring focus-ring-primary`}
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optionnel)"
                style={{ fontSize: "1rem" }}
              ></textarea>
            </div>
            <button
              type="submit"
              className={`btn w-100 py-2 rounded-3 fw-semibold shadow-sm ${isDarkMode ? "btn-primary" : "btn-primary"}`}
              disabled={loading}
              style={{ fontSize: "1.1rem", letterSpacing: "0.03em" }}
            >
              {loading ? "Saving..." : "Save Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}