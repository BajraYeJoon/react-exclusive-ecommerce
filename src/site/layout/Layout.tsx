import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Banner, Navbar, Footer } from "../../pages";
import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div role="status">
      <LoaderCircle className="animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const Layout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export { Layout };
