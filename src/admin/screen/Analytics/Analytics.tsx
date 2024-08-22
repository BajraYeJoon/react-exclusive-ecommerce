import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import Chart from "../../components/Chart/Chart";
import { userData } from "../../lib/data";
import WidgetLeft from "../../components/Widgets/WidgetLeft";
import WidgetRight from "../../components/Widgets/WidgetRight";

const Analytics = () => {
  return (
    <div className="flex flex-col flex-[4] space-y-5">
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
