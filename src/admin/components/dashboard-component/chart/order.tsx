import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const orderStatusData = [
	{ name: "Completed", value: 5400 },
	{ name: "Processing", value: 1200 },
	{ name: "Shipped", value: 2400 },
	{ name: "Cancelled", value: 400 },
];

const Order = () => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie dataKey="value" data={orderStatusData} fill="#8884d8" label />
				<Tooltip />
			</PieChart>
		</ResponsiveContainer>
	);
};

export default Order;
