import { IndexAdmin } from "../pages/admin/IndexAdmin";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";


export const router = createBrowserRouter([

  {
    path: "/admin",
    element: <IndexAdmin />,
  }
]);
