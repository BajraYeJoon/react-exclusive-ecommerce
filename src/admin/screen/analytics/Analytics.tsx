import FeaturedInfo from "../../components/dashboard-component/featuredInfo/FeaturedInfo";
import Chart from "../../components/dashboard-component/chart/Chart";
import WidgetLeft from "../../components/dashboard-component/widgets/WidgetLeft";
import WidgetRight from "../../components/dashboard-component/widgets/WidgetRight";

const Analytics = () => {
  // const { data: userData } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchAllUsers,
  // });

  //

  return (
    <div className="mb-5 flex w-full flex-col gap-5 px-4 lg:mx-8">
      <FeaturedInfo />
      <Chart
      // data={userData}
      // title="User Analytics"
      // grid
      // dataKey="Active User"
      />
      <div className="widget my-7 flex flex-col-reverse items-start justify-center gap-14 md:gap-6 lg:flex-row">
        <WidgetLeft />
        <WidgetRight />
      </div>
    </div>
  );
};

export default Analytics;
