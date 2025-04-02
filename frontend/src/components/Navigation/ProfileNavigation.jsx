import React from 'react';
import { NavLink } from 'react-router'; // Corrected import for NavLink
import './ProfileNavigation.css'; // Import the CSS file for styling

const ProfileNavigation = () => {
    return (
        <div className="sidebar-container">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
                {/* Navigation Links */}
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/app/profile/settings"
                            className={({ isActive }) =>
                                `nav-link fw-semibold ${isActive ? 'active' : 'nav-link link-dark'}` 
                            }
                        >
                            <i className="bi bi-gear me-3"></i>
                            Profile Settings
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/app/profile/posts"
                            className={({ isActive }) =>
                                `nav-link fw-semibold ${isActive ? 'active  ' : 'nav-link link-dark'}`
                            }
                        >
                            <i className="bi bi-grid me-3"></i>
                            My Posts
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/app/profile/favorites"
                            className={({ isActive }) =>
                                `nav-link fw-semibold ${isActive ? 'active' : 'nav-link link-dark'}`
                            }
                        >
                            <i className="bi bi-heart me-3"></i>
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileNavigation;