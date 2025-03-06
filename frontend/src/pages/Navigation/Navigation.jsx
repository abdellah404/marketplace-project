import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth.js";

export function Navigation() {
const { user, logout, isAuthenticated } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
logout().then(() => {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/app/login"); // Redirect after logout
});
};

return (
<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar_container">
        <div className="container">
            <Link to="/app">
            <img src="https://www.avito.ma/phoenix-assets/imgs/layout/new-logo.svg" alt="Bootstrap" />
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item me-3">
                        <Link className="nav-link" to="/app">Home</Link>
                    </li>

                    {isAuthenticated ? (
                    <li className="nav-item dropdown me-4">
                        <button className="btn btn-transparent dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i className="bi bi-person me-1"></i> {user.name}
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="dropdown-item" to="/app/profile">
                                <i className="bi bi-person-square me-2"></i> Profile
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/app/my-posts">
                                <i className="bi bi-stickies me-2"></i> My Posts
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/app/chat">
                                <i className="bi bi-chat me-2"></i> Chat
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="dropdown-item text-danger">
                                    <i className="bi bi-box-arrow-left me-2"></i> Logout
                                </button>
                            </li>
                        </ul>
                    </li>
                    ) : (
                    <li className="nav-item">
                        <Link className="nav-link me-3" to="/app/login">
                        Se connecter
                        </Link>
                    </li>
                    )}

                    <li className="nav-item">
                        <Link to="/app/new-post">
                        <div className="btn btn-danger">
                            <i className="bi bi-plus-circle me-2"></i>
                            Publier une annonce
                        </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</>
);
}
