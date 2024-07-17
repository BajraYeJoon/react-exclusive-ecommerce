import { createBrowserRouter } from "react-router-dom";
import { Layout, Home } from "../site";

import ErrorPage from "../error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/contact",
        element: <div>Contact</div>,
      },
      {
        path: "/sign-up",
        element: <div>Sign Up</div>,
      },
    ],
  },
]);
