import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Home, ShoppingCart } from "../pages";
export const AppRouters = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shopping",
        element: <ShoppingCart />,
      },
    ],
  },
]);
