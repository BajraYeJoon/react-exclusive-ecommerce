import { Button } from "../../components/ui/button";

const Banner = () => {
  return (
    <div className="banner-wrapper flex gap-3 items-center mx-auto justify-center w-full p-4 bg-foreground">
      <div>
        <span className="banner-notice text-sm font-normal text-background/60">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
      </div>

      <Button variant={"link"}>Shop Now</Button>
    </div>
  );
};

export default Banner;
