import React from "react";
import useTheme from "../../hooks/useTheme";
import { Link } from "react-router";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={isDarkMode ? "bg-dark border-top mt-5 text-light" : "bg-light border-top mt-5 text-dark"}>
      <div className="container py-5">
        <div className="row align-items-center justify-content-between">
          <Link to={"/app/contact"} className="col-auto mb-3 mb-md-0">
            <button
              className={`btn rounded-pill px-5 py-2 fw-semibold shadow-none fs-5 ${
                isDarkMode ? "btn-light text-dark" : "btn-primary"
              }`}
            >
              Contact
            </button>
          </Link>
          <div className="col-auto mb-3 mb-md-0 d-flex flex-column flex-md-row align-items-center gap-3">
            <Link
              to="/app/recommended"
              className={`fw-semibold text-decoration-none fs-5 ${isDarkMode ? "text-light" : "text-dark"}`}
            >
              Recommandé
            </Link>
            <Link
              to="/app/about"
              className={`fw-semibold text-decoration-none fs-5 ${isDarkMode ? "text-light" : "text-dark"}`}
            >
              À propos
            </Link>
            <Link
              to="/app/terms"
              className={`fw-semibold text-decoration-none fs-5 ${isDarkMode ? "text-light" : "text-dark"}`}
            >
              Conditions
            </Link>
            <Link
              to="/app/help"
              className={`fw-semibold text-decoration-none fs-5 ${isDarkMode ? "text-light" : "text-dark"}`}
            >
              Aide
            </Link>
          </div>
          <div className="col-12 text-center mt-4">
            <hr className={isDarkMode ? "my-3 border-light" : "my-3"} />
            <span className={`small ${isDarkMode ? "text-light" : "text-muted"}`}>
              &copy; {new Date().getFullYear()} Marketplace &mdash; All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;