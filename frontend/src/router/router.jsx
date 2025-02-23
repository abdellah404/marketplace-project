import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Navigation } from "../pages/Navigation/Navigation";
import { Login } from "../pages/User/Login";
import { Register } from "../pages/User/Register";
import { IndexAdmin } from "../pages/admin/IndexAdmin";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/User/GuestLayout";
import HomePage from "../pages/HomePage/HomePage";
import Highlights from "../components/Highlights/Highlights";

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
  
]);
