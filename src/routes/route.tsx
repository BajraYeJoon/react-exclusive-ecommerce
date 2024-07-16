import { createBrowserRouter } from "react-router-dom";
import Layout from "../site/layout/Layout";
import Home from "../site/home/Home";
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
    ],
  },
]);
