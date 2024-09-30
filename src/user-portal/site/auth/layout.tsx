import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <section className="flex items-center bg-background md:flex-1 md:justify-center lg:justify-between">
      <img
        src="/s-banner.png"
        alt="Baner Image for Authentication"
        loading="lazy"
        decoding="async"
        className="hidden md:block md:h-[300px] md:w-[300px] lg:h-[500px] lg:w-[500px] xl:h-auto xl:w-auto"
      />
      <div className="auth-container flex w-full flex-col items-center justify-center p-6 md:m-12 lg:m-20 lg:gap-10">
        <Outlet />
      </div>
    </section>
  );
}

export { AuthLayout };
