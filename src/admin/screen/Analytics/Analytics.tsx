import FeaturedInfo from "../../components/dashboard-component/featuredInfo/FeaturedInfo";
import Chart from "../../components/dashboard-component/chart/Chart";
import { userData } from "../../lib/data";
import WidgetLeft from "../../components/dashboard-component/widgets/WidgetLeft";
import WidgetRight from "../../components/dashboard-component/widgets/WidgetRight";

const Analytics = () => {
  // const { data: userData } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchAllUsers,
  // });

  // console.log(userData.data);

  return (
    <div className="flex flex-[4] flex-col space-y-5">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="flex gap-6">
        <WidgetLeft />
        <WidgetRight />
      </div>
    </div>
  );
};

export default Analytics;
