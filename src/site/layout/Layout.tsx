import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Banner, Navbar, Footer } from "../../pages";

const Layout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export { Layout };
