import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <section className="my-12 flex items-center justify-between">
      <img src="/s-banner.png" alt="" className="h-auto w-auto" />
      <Outlet />
    </section>
  );
}

export { AuthLayout };
