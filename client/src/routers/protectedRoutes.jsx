import Error from "../Error";
import { ViewAuction } from "../pages/ViewAuction";
import { MainLayout } from "../layout/MainLayout";
import { AuctionList } from "../pages/AuctionList";
import { CreateAuction } from "../pages/CreateAuction";
import { MyAuction } from "../pages/MyAuction";
import Profile from "../pages/Profile";
import Privacy from "../pages/Privacy";

export const protectedRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "auction",
        element: <AuctionList />,
        errorElement: <Error />,
      },
      {
        path: "myauction",
        element: <MyAuction />,
        errorElement: <Error />,
      },
      {
        path: "create",
        element: <CreateAuction />,
        errorElement: <Error />,
      },
      {
        path: "auction/:id",
        element: <ViewAuction />,
        errorElement: <Error />,
      },

      {
        path: "profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: "privacy",
        element: <Privacy />,
        errorElement: <Error />,
      },
    ],
  },
];
