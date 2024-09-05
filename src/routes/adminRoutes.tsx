import {
  AddCategoryForm,
  FlashSaleAdmin,
  ProductsList,
  UserList,
} from "../admin/components";
import { Routes } from "../admin/lib/links";
import { Dashboard } from "../admin/screen";

export const adminRoutes = [
  {
    index: true,
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
];
