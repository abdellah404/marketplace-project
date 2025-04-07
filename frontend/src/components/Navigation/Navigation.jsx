import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth.js";
import "./Navigation.css";
import ThemeButton from "../form/ThemeButton.jsx";
import useTheme from "../../hooks/useTheme.js";
import { useEffect, useState } from "react";

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/app/login");
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
        <Link to="/app" className="navbar-brand">
          <img
            src="https://www.liblogo.com/img-logo/max/ma7809m1dc-marketplace-logo-marketplace-logo-internet--com.png"
            height={50}
            alt="Marketplace Logo"
            className={isDarkMode ? "logo-dark" : "logo-light"}
          />
        </Link>

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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${isDarkMode ? "text-light" : "text-dark"}`}
                to="/app"
              >
                Home
              </Link>
            </li>

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
                      to="/app/profile/settings"
                    >
                      <i className="bi bi-person-square me-2"></i> Profile Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                      to="/app/profile/favorites"
                    >
                      <i className="bi bi-heart me-2"></i> My Favourites
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                      to="/app/profile/posts"
                    >
                      <i className="bi bi-stickies me-2"></i> My Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                      to="/app/chat"
                    >
                      <i className="bi bi-chat me-2"></i> Chat
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
                  className={`nav-link ${isDarkMode ? "text-light" : "text-dark"}`}
                  to="/app/login"
                >
                  Sign In
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                to="/app/post"
                className={`btn ${
                  isDarkMode ? "btn-outline-light" : "btn-danger"
                } ms-2`}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Publier une annonce
              </Link>
            </li>

            <li className="nav-item ms-3">
              <ThemeButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}