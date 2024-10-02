/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { UserRoutes } from "../user-portal/utils/userLinks";
import { ProtectedRoute } from "../user-portal/components";
import {
  DiscountCard,
  ForgotPassword,
  NotFoundPage,
  OtpVerificationForm,
} from "../common/components";
import EmailVerification from "../user-portal/components/email/Verification";
import VerifyPayment from "../user-portal/components/VerifyPayment";

const Home = lazy(() =>
  import("../user-portal/site/home/Home").then((module) => ({
    default: module.Home,
  })),
);
const About = lazy(() =>
  import("../user-portal/site/about/about").then((module) => ({
    default: module.About,
  })),
);
const Contact = lazy(() =>
  import("../user-portal/site/contact/contact").then((module) => ({
    default: module.Contact,
  })),
);
const AuthLayout = lazy(() =>
  import("../user-portal/site/auth/layout").then((module) => ({
    default: module.AuthLayout,
  })),
);
const SignupPage = lazy(() =>
  import("../user-portal/site/auth/SignupPage").then((module) => ({
    default: module.SignupPage,
  })),
);
const SignInPage = lazy(() =>
  import("../user-portal/site/auth/SignInPage").then((module) => ({
    default: module.SignInPage,
  })),
);
const ProfilePage = lazy(() =>
  import("../user-portal/site/profile").then((module) => ({
    default: module.ProfilePage,
  })),
);
const HomeCollections = lazy(() =>
  import("../common/components/home-collections/HomeCollections").then(
    (module) => ({ default: module.HomeCollections }),
  ),
);
const BrandZone = lazy(
  () => import("../user-portal/components/brandZone/BrandZone"),
);
const HalloweenMain = lazy(
  () => import("../common/components/HalloweenPage/HalloweenMain"),
);

// Helper functions
const isAuthenticated = () => !!Cookies.get("access_token");
const hasKey = () => !!Cookies.get("key");

export const userRoutes = [
  { index: true, element: <Home /> },
  { path: UserRoutes.About, element: <About /> },
  { path: UserRoutes.Contact, element: <Contact /> },
  {
    element: <AuthLayout />,
    loader: () => (isAuthenticated() ? redirect(UserRoutes.Profile) : null),
    children: [
      { path: UserRoutes.SignUp, element: <SignupPage /> },
      { path: UserRoutes.SignIn, element: <SignInPage /> },
      { path: UserRoutes.EmailVerification, element: <EmailVerification /> },
      { path: UserRoutes.ForgotPassword, element: <ForgotPassword /> },
      {
        path: UserRoutes.VerifyOtp,
        element: <OtpVerificationForm />,
        loader: () =>
          hasKey() ? null : redirect(`/${UserRoutes.ForgotPassword}`),
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
  { path: UserRoutes.Discount, element: <DiscountCard /> },
  { path: UserRoutes.Spotlight, element: <HomeCollections /> },
  { path: UserRoutes.Brands, element: <BrandZone /> },
  { path: UserRoutes.Halloweeen, element: <HalloweenMain /> },
  { path: "verifyPayment", element: <VerifyPayment /> },
  { path: UserRoutes.NotFound, element: <NotFoundPage /> },
];
