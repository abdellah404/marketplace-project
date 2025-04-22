import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { ToastContainer } from "react-toastify";
import useTheme from "./hooks/useTheme";
import { RouterProvider } from "react-router";
import { router } from "./router/router";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

// Create a separate component that uses the theme hook
function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-vh-100 ${isDarkMode ? "bg-dark text-light" : "bg-white text-dark"}`}>
      <RouterProvider router={router}></RouterProvider>

      <ToastContainer />
    </div>
  );
}

export default App;