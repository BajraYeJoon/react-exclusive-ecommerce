import { Outlet } from "react-router-dom";
import { Banner, Navbar, Footer } from "../../pages";

const Layout = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export { Layout };
