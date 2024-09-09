import AboutMain from "./about/aboutMain";
import ServiceMain from "./services/serviceMain";
import Stats from "./stats/statsMain";
import Teams from "./teams/teamsMain";

export default function Component() {
  return (
    <div className="my-5 space-y-5">
      <AboutMain />
      <hr />
      <Stats isPro={true} />
      <hr />
      <Teams />
      <hr />
      <ServiceMain />
    </div>
  );
}
