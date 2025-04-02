import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Navigation } from "../components/Navigation/Navigation";
import { Login } from "../pages/User/Login";
import { Register } from "../pages/User/Register";
import { IndexAdmin } from "../pages/admin/IndexAdmin";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/User/GuestLayout";
import HomePage from "../pages/HomePage/HomePage";
import UserLayout from "../layouts/User/UserLayout";
import CreateAnnonce from "../pages/Annonces/CreateAnnonce";
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
import ShowMoreAnnonces from "../pages/Annonces/ShowMoreAnnonces";
import ProfileNavigation from "../components/Navigation/ProfileNavigation";
import ProfileSettings from "../pages/Profile/ProfileSettings";
import ProfileLayout from "../layouts/Profile/ProfileLayout";
import DetailsPage from "../pages/Annonces/DetailsPage";
import Favorites from "../pages/Profile/Favorites";
import Annonces from "../pages/Profile/Annonces";
import ModifyAnnonce from "../pages/Annonces/ModifyAnnonce";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Check user authentication

  return isAuthenticated ? element : <Navigate to="/app/login" replace />;
};

export const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/app",
        element: <HomePage />,
      },
      {
        path: "/app/login",
        element: <Login />,
      },
      {
        path: "/app/register",
        element: <Register />,
      },
      {
        path: "/app/annonces/:cat_id",
        element: <ShowMoreAnnonces />,
      },
      {
        path: "/app/annonces/details/:id",
        element: <DetailsPage />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: "/app/post",
        element: <ProtectedRoute element={<CreateAnnonce />} />,
      },
      {
        path: "/app/profile",
        element: <ProtectedRoute element={<ProfileLayout />} />,
        children: [
          {
            path: "/app/profile/settings",
            element: <ProfileSettings />,
          },
          {
            path: "/app/profile/favorites",
            element: <Favorites />,
          },
          {
            path: "/app/profile/posts",
            element: <Annonces />,
          },
          {
            path: "/app/profile/annonces/edit/:id",
            element: <ProtectedRoute element={<ModifyAnnonce />} />,
          },
        ],
      },
    ],
  },
]);
