import { createBrowserRouter } from "react-router-dom";
import {
  Layout,
  Home,
  SignupPage,
  AuthLayout,
  ProfilePage,
  SignInPage,
  Cart,
} from "../site";

import ErrorPage from "../error-page";
import {
  AllProducts,
  ProtectedRoute,
  Favorites,
  Checkout,
} from "../components";

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
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);
