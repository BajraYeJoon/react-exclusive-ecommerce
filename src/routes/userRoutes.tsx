import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { UserRoutes } from "../user-portal/utils/userLinks";

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
import EmailVerification from "../user-portal/components/email/Verification";

export const userRoutes = [
  { index: true, element: <Home /> },
  { path: UserRoutes.About, element: <About /> },
  { path: UserRoutes.Contact, element: <Contact /> },
  {
    element: <AuthLayout />,
    loader: () => (Cookies.get("token") ? redirect(UserRoutes.Profile) : null),
    children: [
      { path: UserRoutes.SignUp, element: <SignupPage /> },
      { path: UserRoutes.SignIn, element: <SignInPage /> },
      { path: UserRoutes.EmailVerification, element: <EmailVerification /> },
      { path: UserRoutes.ForgotPassword, element: <ForgotPassword /> },
      {
        path: UserRoutes.VerifyOtp,
        element: <OtpVerificationForm />,
        loader: () =>
          !Cookies.get("key")
            ? redirect(`/${UserRoutes.ForgotPassword}`)
            : null,
      },
    ],
  },
  {
    path: UserRoutes.Profile,
    element: (
      <ProtectedRoute role="user">
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  { path: UserRoutes.Cart, element: <Cart /> },
  { path: UserRoutes.Products, element: <AllProducts /> },
  { path: UserRoutes.NewArrivals, element: <ArrivalsPage /> },
  { path: UserRoutes.Favorites, element: <Favorites /> },
  {
    path: UserRoutes.Checkout,
    element: (
      <ProtectedRoute role="user">
        <Checkout />
      </ProtectedRoute>
    ),
    loader: () =>
      !Cookies.get("checkoutData") ? redirect(`/${UserRoutes.Products}`) : null,
  },
  {
    path: UserRoutes.OrderPlaced,
    element: <OrderPlaced />,
    loader: () =>
      !Cookies.get("order-placed") ? redirect(`/${UserRoutes.Products}`) : null,
  },
  { path: UserRoutes.SingleProduct, element: <Singleproduct /> },
  {
    path: UserRoutes.SingleCategory,
    element: <FetchSingleCategory />,
  },
  { path: UserRoutes.NotFound, element: <NotFoundPage /> },
];
