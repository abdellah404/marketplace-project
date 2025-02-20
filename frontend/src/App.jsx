import {Navigation} from "./pages/Navigation.jsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import {Login} from "./pages/Login.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import {IndexAdmin} from "./pages/admin/IndexAdmin.jsx";
import {ProtectedRoute} from "./components/ProtectedRoute.jsx";
import {Register} from "./pages/Register.jsx";

const RootComonent = function (){
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootComonent />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
            path: "/admin",
            element: <ProtectedRoute><IndexAdmin /></ProtectedRoute>
            }
        ]
    }
]);

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router} ></RouterProvider>
    </Provider>
  )
}

export default App
