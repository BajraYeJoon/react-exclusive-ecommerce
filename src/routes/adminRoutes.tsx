import { AddCategoryForm, ProductsList, UserList } from "../admin/components";
import { Dashboard } from "../admin/screen";

export const adminRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "products",
    element: <ProductsList />,
  },
  {
    path: "orders",
    element: <div>orders</div>,
  },
  {
    path: "users",
    element: <UserList />,
  },
  {
    path: "add-category",
    element: <AddCategoryForm />,
  },
];
