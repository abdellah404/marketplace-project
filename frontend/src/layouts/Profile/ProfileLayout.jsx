import React from 'react';
import { Outlet } from 'react-router';
import ProfileNavigation from '../../components/Navigation/ProfileNavigation';
import './ProfileLayout.css'; // Assuming you have a CSS file for styling
const ProfileLayout = ({ children }) => {
    return (
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <ProfileNavigation />
          </aside>
    
          {/* Main Content */}
          <main className="profile-content">
          <Outlet/>
          </main>
        </div>
      );
};

export default ProfileLayout;