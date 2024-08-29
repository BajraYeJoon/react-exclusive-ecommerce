import { Outlet } from "react-router-dom";
import Header from "../screen/Header/Header";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import SidebarPanel from "../screen/Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <MaxWidthWrapper>
      <Header />
      <div className="mt-10 flex gap-4">
        <SidebarPanel />

        <Outlet />
      </div>
    </MaxWidthWrapper>
  );
};

export default AdminLayout;
