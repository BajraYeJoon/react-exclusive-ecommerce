import { createBrowserRouter, redirect } from "react-router-dom";
import {
  Layout,
  Home,
  SignupPage,
  AuthLayout,
  ProfilePage,
  SignInPage,
  Cart,
} from "../site";
import Cookies from "js-cookie";

import ErrorPage from "../error-page";
import {
  AllProducts,
  ProtectedRoute,
  Favorites,
  Checkout,
  OrderPlaced,
  FetchSingleCategory,
} from "../components";
import Contact from "../site/contact/contact";
import About from "../site/about/about";
import Singleproduct from "../components/singleProduct/singleproduct";
import { ArrivalsPage } from "../pages";
import AdminLayout from "../admin/Layout/Layout";
import Dashboard from "../admin/screen/Dashboard/Dashboard";
import UserList from "../admin/components/UserList/UserList";

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
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        element: <AuthLayout />,
        loader: () => (Cookies.get("token") ? redirect("/profile") : null),
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
          <ProtectedRoute role="user">
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
        path: "new-arrivals",
        element: <ArrivalsPage />,
      },
      {
        path: ":productName/:productId",
        element: <Singleproduct />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: () =>
          !Cookies.get("checkoutData") ? redirect("/products") : null,
      },
      {
        path: "order-placed",
        element: <OrderPlaced />,
        loader: () =>
          !Cookies.get("order-placed") ? redirect("/products") : null,
      },
      {
        path: "category/:categoryName/:categoryId",
        element: <FetchSingleCategory />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <div>products</div>,
      },
      {
        path: "orders",
        element: <div>orders</div>,
      },
      {
        path: "users",
        element: <UserList />,
      },
    ],
  },
]);
