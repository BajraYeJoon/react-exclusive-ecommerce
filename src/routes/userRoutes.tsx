import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { UserRoutes } from "../user-portal/utils/userLinks";

import {
  DiscountCard,
  ForgotPassword,
  NotFoundPage,
  OtpVerificationForm,
} from "../common/components";

import { ProtectedRoute } from "../user-portal/components";
import EmailVerification from "../user-portal/components/email/Verification";
import VerifyPayment from "../user-portal/components/VerifyPayment";
import { JSX } from "react/jsx-runtime";

export const userRoutes = [
  {
    index: true,
    lazy: async () => {
      const { Home } = await import("../user-portal/site/home/Home");
      return { Component: Home };
    },
  },
  {
    path: UserRoutes.About,
    lazy: async () => {
      const { About } = await import("../user-portal/site/about/about");
      return { Component: About };
    },
  },
  {
    path: UserRoutes.Contact,
    lazy: async () => {
      const { Contact } = await import("../user-portal/site/contact/contact");
      return { Component: Contact };
    },
  },
  {
    lazy: async () => {
      const { AuthLayout } = await import("../user-portal/site/auth/layout");
      return { Component: AuthLayout };
    },
    loader: () =>
      Cookies.get("accesstoken") ? redirect(UserRoutes.Profile) : null,
    children: [
      {
        path: UserRoutes.SignUp,
        lazy: async () => {
          const { SignupPage } = await import(
            "../user-portal/site/auth/SignupPage"
          );
          return { Component: SignupPage };
        },
      },
      {
        path: UserRoutes.SignIn,
        lazy: async () => {
          const { SignInPage } = await import(
            "../user-portal/site/auth/SignInPage"
          );
          return { Component: SignInPage };
        },
      },
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
    lazy: async () => {
      const { ProfilePage } = await import("../user-portal/site/profile");
      return {
        Component: (props: JSX.IntrinsicAttributes) => (
          <ProtectedRoute role="user">
            <ProfilePage {...props} />
          </ProtectedRoute>
        ),
      };
    },
  },
  { path: UserRoutes.Discount, element: <DiscountCard /> },
  {
    path: UserRoutes.Spotlight,
    lazy: async () => {
      const { HomeCollections } = await import(
        "../common/components/home-collections/HomeCollections"
      );
      return { Component: HomeCollections };
    },
  },
  {
    path: UserRoutes.Brands,
    lazy: async () => {
      const { default: BrandZone } = await import(
        "../user-portal/components/brandZone/BrandZone"
      );
      return {
        Component: BrandZone,
      };
    },
  },
  {
    path: UserRoutes.Halloweeen,
    lazy: async () => {
      const { default: HalloweenMain } = await import(
        "../common/components/HalloweenPage/HalloweenMain"
      );
      return { Component: HalloweenMain };
    },
  },
  {
    path: "verifyPayment",
    element: <VerifyPayment />,
  },
  {
    path: UserRoutes.NotFound,
    element: <NotFoundPage />,
  },
];
