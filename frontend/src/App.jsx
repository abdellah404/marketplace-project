import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store ,persistor } from "./store/store.js";
import { router } from "./router/router.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </Provider>
    </PersistGate>
    
  );
}

export default App;