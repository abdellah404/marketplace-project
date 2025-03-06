import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Navigation } from "../pages/Navigation/Navigation";
import { Login } from "../pages/User/Login";
import { Register } from "../pages/User/Register";
import { IndexAdmin } from "../pages/admin/IndexAdmin";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/User/GuestLayout";
import HomePage from "../pages/HomePage/HomePage";
import UserLayout from "../layouts/User/UserLayout";
import CreateAnnonce from "../pages/Annonces/CreateAnnonce";
import useAuth from "../hooks/useAuth";
import { Navigate , useNavigate } from "react-router";

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
    ],
  },
  { element: <UserLayout />,
     children: [
          {
            path : "/app/post",
            element : <ProtectedRoute element={<CreateAnnonce/>} />
          },

  ] },
]);
