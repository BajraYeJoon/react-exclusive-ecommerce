import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <section className="my-2 flex flex-1 items-center md:my-6 md:justify-center lg:my-12 lg:justify-between">
      <img
        src="/s-banner.png"
        alt="Baner Image for Authentication"
        className="hidden md:block md:h-[300px] md:w-[300px] lg:h-[500px] lg:w-[500px] xl:h-auto xl:w-auto"
      />
      <section className="auth-container m-8 flex w-full flex-col items-center justify-center md:m-12 lg:m-20 lg:gap-10">
        <div className="sign-up-content space-y-8">
          <Outlet />
        </div>
      </section>
    </section>
  );
}

export { AuthLayout };
