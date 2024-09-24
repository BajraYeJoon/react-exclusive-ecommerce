import AboutMain from "./about/aboutMain";
import ServiceMain from "./services/serviceMain";
import Stats from "./stats/statsMain";
import Teams from "./teams/teamsMain";

export default function StaticContent() {
  return (
    <div className="mx-auto w-full space-y-12 p-3 md:px-6">
      <AboutMain />
      <hr />
      <Stats />
      <hr />
      <Teams />
      <hr />
      <ServiceMain />
    </div>
  );
}
