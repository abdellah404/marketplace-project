import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth.js";

export function Navigation() {
const { user, logout, isAuthenticated } = useAuth();
const navigate = useNavigate();

const handleLogout = function () {
logout().then(() => {
localStorage.removeItem("token");
localStorage.removeItem("user");
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
                    <li className="nav-link">
                        <Link className="nav-link" to="/app">
                        Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        {isAuthenticated ? (
                        <Link className="nav-link me-3" to="/app/login">
                        <div className="btn-group">
                            <button class="btn btn-transparent dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="bi bi-person me-1"></i> {user.name}
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <i class="bi bi-person-square me-2"></i>Profile </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <i class="bi bi-stickies me-2"></i>My Posts
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">
                                        <i class="bi bi-chat me-2"></i> Chat
                                    </a>
                                </li>
                                <li>
                                    <a onClick={handleLogout} class="dropdown-item text-color-red">
                                        <i class="bi bi-box-arrow-left me-2 "></i>Logout
                                    </a>
                                </li>
                            </ul>
                        </div>

                        </Link>
                        ) : (
                    <li className="nav-link">
                        <Link className="nav-link me-3" to="/app/login">
                        Se connecter
                        </Link>
                    </li>

                    )}
                    </li>
                    <li className="nav-link  ">
                        <Link to="/app">
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
