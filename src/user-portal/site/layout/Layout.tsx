import { Outlet } from "react-router-dom";
import { Banner, Navbar, Footer } from "../../pages";
import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex h-fit items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

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
