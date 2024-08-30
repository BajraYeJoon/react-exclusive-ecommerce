import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import { AdminLayout } from "../admin/screen";
import { userRoutes } from "./userRoutes";
import { Layout } from "../user-portal/site";
import { ProtectedRoute } from "../user-portal/components";
import { adminRoutes } from "./adminRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [...userRoutes],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [...adminRoutes],
  },
]);
