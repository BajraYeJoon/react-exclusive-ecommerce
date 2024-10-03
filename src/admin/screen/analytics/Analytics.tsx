import FeaturedInfo from "../../components/dashboard-component/featuredInfo/FeaturedInfo";
import Chart from "../../components/dashboard-component/chart/Chart";
import WidgetLeft from "../../components/dashboard-component/widgets/WidgetLeft";
import WidgetRight from "../../components/dashboard-component/widgets/WidgetRight";

const Analytics = () => {
	return (
		<div className="mb-5 flex w-full flex-col gap-5 px-4">
			<FeaturedInfo />
			<Chart />
			<div className="widget my-7 flex flex-col-reverse items-start justify-center gap-14 md:gap-6 lg:flex-row">
				<WidgetLeft />
				<WidgetRight />
			</div>
		</div>
	);
};

export default Analytics;
