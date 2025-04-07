import React from 'react';
import { NavLink } from 'react-router';
import useTheme from '../../hooks/useTheme';
import './ProfileNavigation.css';

const ProfileNavigation = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`sidebar-container ${isDarkMode ? 'dark-sidebar' : ''}`}>
            <div className={`d-flex flex-column flex-shrink-0 p-3 sidebar mt-2 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
                {/* Navigation Links */}
                <ul className="nav nav-pills flex-column mb-auto mt-4">
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/app/profile/settings"
                            className={({ isActive }) =>
                                `nav-link fw-semibold ${isActive 
                                    ? 'active' 
                                    : isDarkMode ? 'text-light' : 'nav-link link-dark'}` 
                            }
                        >
                            <i className={`bi bi-gear me-3 ${isDarkMode ? 'text-light' : ''}`}></i>
                            Profile Settings
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/app/profile/posts"
                            className={({ isActive }) =>
                                `nav-link fw-semibold ${isActive 
                                    ? 'active' 
                                    : isDarkMode ? 'text-light' : 'nav-link link-dark'}`
                            }
                        >
                            <i className={`bi bi-grid me-3 ${isDarkMode ? 'text-light' : ''}`}></i>
                            My Posts
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/app/profile/favorites"
                            className={({ isActive }) =>
                                `nav-link fw-semibold ${isActive 
                                    ? 'active' 
                                    : isDarkMode ? 'text-light' : 'nav-link link-dark'}`
                            }
                        >
                            <i className={`bi bi-heart me-3 ${isDarkMode ? 'text-light' : ''}`}></i>
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileNavigation;