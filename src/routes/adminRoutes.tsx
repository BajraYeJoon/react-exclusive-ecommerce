import { Routes } from "../admin/lib/links";

export const adminRoutes = [
	{
		path: Routes.Dashboard,
		lazy: async () => {
			const { Dashboard } = await import("../admin/screen/index");
			return { Component: Dashboard };
		},
	},
	{
		path: Routes.Products,
		lazy: async () => {
			const { ProductsList } = await import(
				"../admin/components/productsList/ProductsList"
			);
			return { Component: ProductsList };
		},
	},
	{
		path: Routes.Orders,
		element: <div>orders</div>,
	},
	{
		path: Routes.Users,
		lazy: async () => {
			const { UserList } = await import(
				"../admin/components/user-component/userList/UserList"
			);
			return { Component: UserList };
		},
	},
	{
		path: Routes.AddCategory,
		lazy: async () => {
			const { AddCategoryForm } = await import(
				"../admin/components/createCategory/CreateCategory"
			);
			return { Component: AddCategoryForm };
		},
	},
	{
		path: Routes.FlashSales,
		lazy: async () => {
			const { FlashSaleAdmin } = await import(
				"../admin/components/flashSaleCards/FlashSaleCards"
			);
			return { Component: FlashSaleAdmin };
		},
	},
	{
		path: Routes.Banners,
		lazy: async () => {
			const { BannerManagement } = await import(
				"../admin/components/banner/Banner"
			);
			return { Component: BannerManagement };
		},
	},
	{
		path: Routes.CMS,
		lazy: async () => {
			const { StaticContent } = await import(
				"../admin/components/CMS/StaticContent"
			);
			return { Component: StaticContent };
		},
	},
	{
		path: Routes.Profile,
		lazy: async () => {
			const { Dashboard } = await import("../admin/screen/index");
			return { Component: Dashboard };
		},
	},
	{
		path: Routes.Discount,
		lazy: async () => {
			const { default: DiscountCRUD } = await import(
				"../admin/components/discountCRUD/DiscountCRUD"
			);
			return { Component: DiscountCRUD };
		},
	},
	{
		path: Routes.Ratings,
		lazy: async () => {
			const { default: RatingDisplayAdmin } = await import(
				"../admin/components/ratings/RatingDisplayAdmin"
			);
			return { Component: RatingDisplayAdmin };
		},
	},
];
