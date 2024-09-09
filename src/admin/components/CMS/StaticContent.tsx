import { Separator } from "@radix-ui/react-dropdown-menu";
import AboutMain from "./about/aboutMain";
import ServiceMain from "./services/serviceMain";
import Stats from "./stats/statsMain";

export default function Component() {
  return (
    <div className="my-5 space-y-5">
      <AboutMain />
      <hr />
      <Stats isPro={true} />
      <hr />
      <ServiceMain />
    </div>
  );
}
