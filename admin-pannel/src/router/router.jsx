import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Users } from "../pages/UsersList/Users";
import { Login } from "../pages/UserLogin/Login";
import { Register } from "../pages/UserLogin/Register";
import AdminLayout from "../layouts/Admin/AdminLayout";
import Annonces from "../pages/Annonces/Annonces";
import DeleteAnnonce from "../pages/Annonces/DeleteAnnonce";
import { Categories } from "../pages/Annonces/Categories";
import { AjouterCategory } from "../pages/Annonces/AjouterCategory";
import Messages from "../pages/ChatPage/Messages";
import Chat from "../pages/ChatPage/Chat";
import DisabledAnnonces from "../pages/Annonces/DisabledAnnonces";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/users/:id",
        element: <Annonces />,
      },
      {
        path: "/admin/categories",
        element: (
          <>
           <Categories/>
          </>
        ),
      },
      
      {
        path: "/admin/categories/add",
        element: (
          <>
           <AjouterCategory/>
          </>
        ),
      },


      {
        path: "/admin/annonces/delete/:id",
        element: <DeleteAnnonce />,
      },

      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin/register",
        element: <Register />,
      },

      {
        path: "/admin/chat",
        element: <Messages/>,
      },
      {
        path: "/admin/chat/:receiverId",
        element: <Chat/>,
      },
      {
            path: "/admin/annonces/disabled/:id",
            element: <DisabledAnnonces />,
          },
    ],
  },
]);
