import React from 'react';
import { Link } from 'react-router';
const ProfileNavigation = () => {
    return (
        <div className="profile-navigation">
            <nav className="navbar mt-0 navbar-expand-lg navbar-light bg-light p-3 mb-5 bg-light rounded">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/app/profile/settings" style={{ textDecoration: 'none' }}>
                                    <i className="bi bi-gear"></i> Profile Settings
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/profile/my-annonces" style={{ textDecoration: 'none' }}>
                                    <i className="bi bi-file-earmark-text"></i> My Annonces
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/profile/my-favourites" style={{ textDecoration: 'none' }}>
                                    <i className="bi bi-heart"></i> My Favourites
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default ProfileNavigation;