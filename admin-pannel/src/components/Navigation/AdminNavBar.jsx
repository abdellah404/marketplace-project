import { Link, useNavigate } from "react-router";
import "./Navigation.css";
import useTheme from "../../hooks/useTheme.js";
import { useEffect, useState } from "react";
import admin_dark from "../../assets/admin-dark.png";
import admin_light from "../../assets/admin-light.png";
import ThemeButton from "../Form/ThemeButton.jsx";

export function AdminNavBar() {
  const { isDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <ul className="navbar-nav me-auto">
            {/* ... éventuels liens ... */}
          </ul>
  
          {/* Logo centré */}
          <Link to="/app" className="navbar-brand mx-auto logo-custom">
            <img
              height={50}
              width={350}
              src={isDarkMode ? admin_light : admin_dark}
            />
          </Link>
  
          {/* Liste pour aligner à droite */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-3">
              <ThemeButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
