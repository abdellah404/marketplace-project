import { Link } from "react-router";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-body">
      <div className="container text-center">
        <h1 className="display-4 mb-3">Achetez & Vendez Facilement</h1>
        <h2 className="mb-4">Publiez votre annonce gratuitement</h2>
        <Link to={"/app/post"} className="btn btn-danger btn-lg publish-btn">
          <i className="bi bi-plus-circle me-2"></i>
          Publier une annonce
        </Link>
      </div>
    </header>
  );
};

export default Header;
