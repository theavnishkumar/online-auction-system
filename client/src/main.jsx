import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { protectedRoutes } from "./routers/protectedRoutes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { openRoutes } from "./routers/openRoutes.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([...protectedRoutes, ...openRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
