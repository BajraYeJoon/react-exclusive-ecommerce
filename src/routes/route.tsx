import { createBrowserRouter } from "react-router-dom";
import Layout from "../site/layout/Layout";
import Home from "../site/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
