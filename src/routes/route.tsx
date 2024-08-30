import { createBrowserRouter, redirect } from "react-router-dom";
import {
  Layout,
  Home,
  SignupPage,
  AuthLayout,
  ProfilePage,
  SignInPage,
  Cart,
} from "../user-portal/site";
import Cookies from "js-cookie";

import ErrorPage from "../error-page";
import {
  AllProducts,
  ProtectedRoute,
  Favorites,
  Checkout,
  OrderPlaced,
  FetchSingleCategory,
} from "../user-portal/components";
import Contact from "../user-portal/site/contact/contact";
import About from "../user-portal/site/about/about";
import Singleproduct from "../user-portal/components/singleProduct/singleproduct";
import { ArrivalsPage } from "../user-portal/pages";
import AdminLayout from "../admin/layout/Layout";
import Dashboard from "../admin/screen/dashboard/Dashboard";
import UserList from "../admin/components/user-component/userList/UserList";
import ProductsList from "../admin/components/ProductsList/ProductsList";
import AddCategoryForm from "../admin/components/CreateCategory/CreateCategory";
import ForgotPassword from "../common/components/forgot-password/ForgotPassword";
import OtpVerificationForm from "../common/components/forgot-password/OtpVerificationForm";
import { NotFoundPage } from "../common/components/404/notfound";

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
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/verify-otp",
            element: <OtpVerificationForm />,
            loader: () =>
              !Cookies.get("key") ? redirect("/forgot-password") : null,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
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
        element: <ProductsList />,
      },
      {
        path: "orders",
        element: <div>orders</div>,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "add-category",
        element: <AddCategoryForm />,
      },
    ],
  },
]);
