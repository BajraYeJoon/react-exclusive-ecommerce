import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

import {
  ForgotPassword,
  NotFoundPage,
  OtpVerificationForm,
} from "../common/components";
import {
  About,
  AuthLayout,
  Cart,
  Contact,
  Home,
  ProfilePage,
  SignInPage,
  SignupPage,
} from "../user-portal/site";
import {
  AllProducts,
  Checkout,
  Favorites,
  FetchSingleCategory,
  OrderPlaced,
  ProtectedRoute,
  Singleproduct,
} from "../user-portal/components";
import { ArrivalsPage } from "../user-portal/pages";

export const userRoutes = [
  { index: true, element: <Home /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  {
    element: <AuthLayout />,
    loader: () => (Cookies.get("token") ? redirect("/profile") : null),
    children: [
      { path: "sign-up", element: <SignupPage /> },
      { path: "sign-in", element: <SignInPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "verify-otp",
        element: <OtpVerificationForm />,
        loader: () =>
          !Cookies.get("key") ? redirect("/forgot-password") : null,
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
  { path: "cart", element: <Cart /> },
  { path: "products", element: <AllProducts /> },
  { path: "new-arrivals", element: <ArrivalsPage /> },
  { path: "favorites", element: <Favorites /> },
  {
    path: "checkout",
    element: <Checkout />,
    loader: () => (!Cookies.get("checkoutData") ? redirect("/products") : null),
  },
  {
    path: "order-placed",
    element: <OrderPlaced />,
    loader: () => (!Cookies.get("order-placed") ? redirect("/products") : null),
  },
  { path: ":productName/:productId", element: <Singleproduct /> },
  {
    path: "category/:categoryName/:categoryId",
    element: <FetchSingleCategory />,
  },
  { path: "*", element: <NotFoundPage /> },
];
