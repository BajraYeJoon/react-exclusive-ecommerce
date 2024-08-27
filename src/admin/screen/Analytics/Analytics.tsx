import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import Chart from "../../components/Chart/Chart";
import { userData } from "../../lib/data";
import WidgetLeft from "../../components/Widgets/WidgetLeft";
import WidgetRight from "../../components/Widgets/WidgetRight";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/fetchUser";

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
