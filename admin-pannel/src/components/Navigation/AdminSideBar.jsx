import React from "react";
import { NavLink } from "react-router";
import useTheme from "../../hooks/useTheme";
import "./AdminSideBar.css";

const ProfileNavigation = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`sidebar-container ${isDarkMode ? "dark-sidebar" : ""}`}>
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 sidebar mt-2 ${
          isDarkMode ? "bg-dark" : "bg-light"
        }`}
      >
        {/* Navigation Links */}
        <ul className="nav nav-pills flex-column mb-auto mt-4">
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `nav-link fw-semibold ${
                  isActive
                    ? "custom-active"
                    : isDarkMode
                    ? "text-light"
                    : "nav-link link-dark"
                }`
              }
            >
              <i
                className={`bi bi-people me-3 ${
                  isDarkMode ? "text-light" : ""
                }`}
              ></i>
              Utilisateurs
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `nav-link fw-semibold ${
                  isActive
                    ? "custom-active"
                    : isDarkMode
                    ? "text-light"
                    : "nav-link link-dark"
                }`
              }
            >
              <i
                className={`bi bi-megaphone me-3 ${
                  isDarkMode ? "text-light" : ""
                }`}
              ></i>
              Categories
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/admin/chat"
              className={({ isActive }) =>
                `nav-link fw-semibold ${
                  isActive
                    ? "custom-active"
                    : isDarkMode
                    ? "text-light"
                    : "nav-link link-dark"
                }`
              }
            >
              <i
                className={`bi bi-chat-dots me-3 ${
                  isDarkMode ? "text-light" : ""
                }`}
              ></i>
              Messages
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNavigation;
