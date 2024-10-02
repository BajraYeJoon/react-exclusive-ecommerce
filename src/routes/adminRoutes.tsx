/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Routes } from "../admin/lib/links";

// Lazy-loaded components
const Dashboard = lazy(() =>
  import("../admin/screen/index").then((module) => ({
    default: module.Dashboard,
  })),
);
const ProductsList = lazy(() =>
  import("../admin/components/productsList/ProductsList").then((module) => ({
    default: module.ProductsList,
  })),
);
const UserList = lazy(() =>
  import("../admin/components/user-component/userList/UserList").then(
    (module) => ({ default: module.UserList }),
  ),
);
const AddCategoryForm = lazy(() =>
  import("../admin/components/createCategory/CreateCategory").then(
    (module) => ({ default: module.AddCategoryForm }),
  ),
);
const FlashSaleAdmin = lazy(() =>
  import("../admin/components/flashSaleCards/FlashSaleCards").then(
    (module) => ({ default: module.FlashSaleAdmin }),
  ),
);
const BannerManagement = lazy(() =>
  import("../admin/components/banner/Banner").then((module) => ({
    default: module.BannerManagement,
  })),
);
const StaticContent = lazy(() =>
  import("../admin/components/CMS/StaticContent").then((module) => ({
    default: module.StaticContent,
  })),
);
const DiscountCRUD = lazy(
  () => import("../admin/components/discountCRUD/DiscountCRUD"),
);
const RatingDisplayAdmin = lazy(
  () => import("../admin/components/ratings/RatingDisplayAdmin"),
);

// Route configurations
export const adminRoutes = [
  { path: Routes.Dashboard, element: <Dashboard /> },
  { path: Routes.Products, element: <ProductsList /> },
  { path: Routes.Orders, element: <div>orders</div> },
  { path: Routes.Users, element: <UserList /> },
  { path: Routes.AddCategory, element: <AddCategoryForm /> },
  { path: Routes.FlashSales, element: <FlashSaleAdmin /> },
  { path: Routes.Banners, element: <BannerManagement /> },
  { path: Routes.CMS, element: <StaticContent /> },
  { path: Routes.Profile, element: <Dashboard /> },
  { path: Routes.Discount, element: <DiscountCRUD /> },
  { path: Routes.Ratings, element: <RatingDisplayAdmin /> },
];
