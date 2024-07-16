import { Button } from "../../components/ui/button";

const Banner = () => {
  return (
    <div className="bg-foreground text-background">
      <div className="flex flex-col md:flex-row items-center justify-center relative py-3 mx-64 max-3xl:mx-24 max-2xl:mx-14">
        <div className="flex items-center gap-3 max-2xl:max-w-2xl text-center">
          <p className="text-base max-2xl:text-sm">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <a className="underline cursor-pointer " href="/en">
              ShopNow
            </a>
          </p>
        </div>
        <div className="flex md:absolute md:right-0 md:top-2/4 md:-translate-y-2/4">
          <div className="">
            <select className=" cursor-pointer text-background bg-transparent">
              <option value="en" className="">
                English
              </option>
              <option value="ru" className="">
                Russian
              </option>
              <option value="tm" className="">
                Turkmen
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
