import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "./Navigation.css";
import useTheme from "../../hooks/useTheme.js";
import admin_dark from "../../assets/admin-dark.png";
import admin_light from "../../assets/admin-light.png";
import ThemeButton from "../Form/ThemeButton.jsx";
import useAuth from "../../hooks/useAuth.js";

export function AdminNavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = ()=>{
    logout().then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/admin/login");
    });
  };

  

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        isDarkMode
          ? `bg-dark ${scrolled ? "navbar-dark-scrolled" : "navbar-dark"}`
          : `bg-light ${scrolled ? "navbar-light-scrolled" : "navbar-light"}`
      } ${isDarkMode ? "navbar-dark-mode" : "navbar-light-mode"}`}
      id="navbar_container"
      style={{
        boxShadow: isDarkMode
          ? "0 2px 5px rgba(255, 255, 255, 0.1)"
          : "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container">
        <button
          className={`navbar-toggler ${
            isDarkMode ? "custom-toggler-dark" : "custom-toggler-light"
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Liste pour aligner à gauche si besoin */}
            

          <Link to="/admin" className="navbar-logo navbar-brand mb-2">
            <img
              height={40}
              width={300}
              src={isDarkMode ? admin_light : admin_dark}
            />
          </Link>

          <ul className="navbar-nav ms-auto">

          {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button
                  className={`btn btn-link nav-link dropdown-toggle ${
                    isDarkMode ? "text-light" : "text-dark"
                  }`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person me-1"></i> {user.name}
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    isDarkMode ? "dropdown-menu-dark" : ""
                  }`}
                >
                  <li>
                    <Link
                      className={`dropdown-item ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                      to="/admin/users"
                    >
                      <i className="bi bi-person-square me-2"></i> Users
                    </Link>
                  </li>
                                
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      <i className="bi bi-box-arrow-left me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isDarkMode ? "text-light" : "text-dark"
                  }`}
                  to="/admin/login"
                >
                  Sign In
                </Link>
              </li>
            )}

            <li className="nav-item ms-3">
              <ThemeButton />
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}