import { Link } from "react-router";
import useTheme from "../../hooks/useTheme";

const Header = () => {
  const { isDarkMode } = useTheme();

  return (
    <header className={`py-5 ${isDarkMode ? "bg-dark text-light" : " text-dark"}`}>
      <div className="container text-center">
        <h1 className={`display-4 mb-3 ${isDarkMode ? "text-white" : "text-dark"}`}>
          Achetez & Vendez Facilement
        </h1>
        <h6 className={`display-6 mb-4 ${isDarkMode ? "text-white" : "text-muted"}`}>
          Publiez votre annonce gratuitement
        </h6>
        <Link
                to="/app/post"
                className={`btn ${
                  isDarkMode ? "btn-outline-light" : "btn-danger"
                } ms-2`}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Publier une annonce
              </Link>
      </div>
    </header>
  );
};

export default Header;