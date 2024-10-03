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
import type { JSX } from "react/jsx-runtime";
import Onboarding from "../user-portal/components/onboarding";

// Authentication Routes
const authRoutes = [
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
			!Cookies.get("key") ? redirect(`/${UserRoutes.ForgotPassword}`) : null,
	},
	{
		path: "onboarding",
		element: <Onboarding />,
	},
];

// User Profile Routes
const profileRoutes = [
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
];

// Product Routes
const productRoutes = [
	{
		path: UserRoutes.Products,
		lazy: async () => {
			const { default: AllProducts } = await import(
				"../user-portal/components/product-components/allProducts/AllProducts"
			);
			return { Component: AllProducts };
		},
	},
	{
		path: UserRoutes.Favorites,
		lazy: async () => {
			const { default: Favorites } = await import(
				"../user-portal/components/favorites/Favorites"
			);
			return { Component: Favorites };
		},
	},
	{
		path: UserRoutes.SingleCategory,
		lazy: async () => {
			const { default: SingleCategory } = await import(
				"../user-portal/components/fetchSingleCategory/FetchSingleCategory"
			);
			return { Component: SingleCategory };
		},
	},
	{
		path: UserRoutes.SingleProduct,
		lazy: async () => {
			const { default: SingleProduct } = await import(
				"../user-portal/components/singleProduct/singleproduct"
			);
			return { Component: SingleProduct };
		},
	},
	{
		path: UserRoutes.NewArrivals,
		lazy: async () => {
			const { default: NewArrivals } = await import(
				"../user-portal/pages/ArrivalsProductsGrid/ArrivalsPage"
			);
			return { Component: NewArrivals };
		},
	},
	{
		path: UserRoutes.Brands,
		lazy: async () => {
			const { default: BrandZone } = await import(
				"../user-portal/components/brandZone/BrandZone"
			);
			return { Component: BrandZone };
		},
	},
];

// Cart and Checkout Routes
const cartCheckoutRoutes = [
	{
		path: UserRoutes.Cart,
		lazy: async () => {
			const { Cart } = await import("../user-portal/site/cart/cart");
			return { Component: Cart };
		},
	},
	{
		path: UserRoutes.Checkout,
		lazy: async () => {
			const { default: Checkout } = await import(
				"../user-portal/components/checkout/Checkout"
			);
			return { Component: Checkout };
		},
	},
];

// Pages Routes
const pagesRoutes = [
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
];

// Error Handling Route
const errorRoutes = [
	{
		path: UserRoutes.NotFound,
		element: <NotFoundPage />,
	},
];

// Main User Routes Array
export const userRoutes = [
	{
		index: true,
		lazy: async () => {
			const { Home } = await import("../user-portal/site/home/Home");
			return { Component: Home };
		},
	},
	{
		lazy: async () => {
			const { AuthLayout } = await import("../user-portal/site/auth/layout");
			return { Component: AuthLayout };
		},
		loader: () =>
			Cookies.get("access_token") ? redirect(UserRoutes.Profile) : null,
		children: authRoutes,
	},
	...profileRoutes,
	...productRoutes,
	...cartCheckoutRoutes,
	...pagesRoutes,
	...errorRoutes,
];
