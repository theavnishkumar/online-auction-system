import Error from "../Error";
import { OpenLayout } from "../layout/OpenLayout";
import { Contact } from "../pages/Contact";
import { Landing } from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const openRoutes = [
  {
    path: "/",
    element: <OpenLayout />,
    errorElement: <Error />,
    children: [
      {
        index:true,
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "signup",
        element: <Signup />,
        errorElement: <Error />,
      },
      {
        path: "contact",
        element: <Contact />,
        errorElement: <Error />,
      },
    ],
  },
];
