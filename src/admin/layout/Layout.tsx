import { Outlet } from "react-router-dom";
import Header from "../screen/header/Header";
import SidebarPanel from "../screen/sidebar/Sidebar";
import { MaxWidthWrapper } from "./MaxWidthWrapper";

const AdminLayout = () => {
  return (
    <MaxWidthWrapper>
      <Header />
      <div className="mt-2 flex gap-4">
        <SidebarPanel />

        <Outlet />
      </div>
    </MaxWidthWrapper>
  );
};

export default AdminLayout;
