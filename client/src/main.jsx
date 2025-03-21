import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Error from "./Error.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import CreateAuction from "./components/CreateAuction.jsx";
import MyAuction from "./pages/MyAuction.jsx";
import Product from "./pages/Product.jsx";
import Test from "./pages/Test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "auction",
        element: <Dashboard />,
      },
      {
        path: "create-auction",
        element: <CreateAuction />,
      },
      {
        path: "auction/user/:userId",
        element: <MyAuction />,
      },
      {
        path: "auction/:productId",
        element: <Product />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
