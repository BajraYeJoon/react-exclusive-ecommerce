import {
  AddCategoryForm,
  FlashSaleAdmin,
  ProductsList,
  UserList,
  Banner,
  StaticContent,
} from "../admin/components";
import { Routes } from "../admin/lib/links";
import { Dashboard } from "../admin/screen";

export const adminRoutes = [
  {
    path: Routes.Dashboard,
    element: <Dashboard />,
  },
  {
    path: Routes.Products,
    element: <ProductsList />,
  },
  {
    path: Routes.Orders,
    element: <div>orders</div>,
  },
  {
    path: Routes.Users,
    element: <UserList />,
  },
  {
    path: Routes.AddCategory,
    element: <AddCategoryForm />,
  },
  {
    path: Routes.FlashSales,
    element: <FlashSaleAdmin />,
  },
  {
    path: Routes.Banners,
    element: <Banner />,
  },
  {
    path: Routes.CMS,
    element: <StaticContent />,
  },
  {
    path: Routes.Profile,
    element: <Dashboard />,
  },
];
