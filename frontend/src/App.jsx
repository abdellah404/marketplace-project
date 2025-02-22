import { Navigation } from "./pages/Navigation/Navigation.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Login } from "./pages/User/Login.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { IndexAdmin } from "./pages/admin/IndexAdmin.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Register } from "./pages/User/Register.jsx";
import { router } from "./router/router.jsx";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
