import {
  AddCategoryForm,
  FlashSaleAdmin,
  ProductsList,
  UserList,
  Banner,
  StaticContent,
  DiscountCreator,
} from "../admin/components";
import DiscountCRUD from "../admin/components/discountCRUD/DiscountCRUD";
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
  {
    path: Routes.Discount,
    // element: <DiscountCreator />,
    element: <DiscountCRUD />,
  },
];
