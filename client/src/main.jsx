import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { protectedRoutes } from "./routers/protectedRoutes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { openRoutes } from "./routers/openRoutes.jsx";
import InitAuth from "./init/InitAuth.jsx";
import { adminRouter } from "./routers/adminRouter.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([...adminRouter,...protectedRoutes, ...openRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InitAuth>
        <RouterProvider router={router} />
        </InitAuth>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
