import { Outlet } from "react-router-dom";
import { Banner, Navbar } from "../../pages";

const Layout = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <Outlet />
    </>
  );
};

export { Layout };
