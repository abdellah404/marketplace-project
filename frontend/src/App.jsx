import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store ,persistor } from "./store/store.js";
import { router } from "./router/router.jsx";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
    </PersistGate>
    
  );
}

export default App;