import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Banner, Navbar, Footer } from "../../pages";
import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div role="status" className="flex h-fit items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
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
