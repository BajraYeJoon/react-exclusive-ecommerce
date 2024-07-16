const Banner = () => {
  return (
    <div className="banner-container bg-foreground text-background">
      <div className="banner-content flex flex-col md:flex-row items-center justify-center relative py-3 mx-64 max-3xl:mx-24 max-2xl:mx-14">
        <div className="sale-message-container flex items-center gap-3 max-2xl:max-w-2xl text-center">
          <p className="sale-message text-base max-2xl:text-sm">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <a className=" ml-4 underline cursor-pointer" href="/en">
              ShopNow
            </a>
          </p>
        </div>
        <div className="language-selector flex md:absolute md:right-0 md:top-2/4 md:-translate-y-2/4">
          <select className=" cursor-pointer text-background bg-transparent">
            <option value="en" className="text-foreground">
              English
            </option>
            <option value="ru" className="text-foreground">
              Espanol
            </option>
            <option value="tm" className="text-foreground">
              French
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Banner;
