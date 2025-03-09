import React from 'react';
import { Navigation } from '../../pages/Navigation/Navigation';
import { Outlet } from 'react-router';
import ProfileNavigation from '../../pages/Profile/ProfileNavigation';

const ProfileLayout = ({ children }) => {
    return (
        <>
        <ProfileNavigation/>
        <Outlet/>
        </>
    );
};

export default ProfileLayout;