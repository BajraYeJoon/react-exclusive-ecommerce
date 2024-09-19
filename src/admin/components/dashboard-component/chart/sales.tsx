import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const monthlySalesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 198 },
  { month: "Mar", sales: 5000, orders: 300 },
  { month: "Apr", sales: 4780, orders: 268 },
  { month: "May", sales: 5890, orders: 320 },
  { month: "Jun", sales: 6390, orders: 358 },
  { month: "Jul", sales: 7490, orders: 400 },
];

const Sales = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlySalesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="sales" stroke="red" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="orders"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Sales;
