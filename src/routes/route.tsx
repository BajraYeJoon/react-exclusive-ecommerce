import { createBrowserRouter } from "react-router-dom";
import {
  Layout,
  Home,
  SignupPage,
  AuthLayout,
  ProfilePage,
  SignInPage,
} from "../site";

import ErrorPage from "../error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,

        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/sign-up",
            element: <SignupPage />,
          },
          {
            path: "/sign-in",
            element: <SignInPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
