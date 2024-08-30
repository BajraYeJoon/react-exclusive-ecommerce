import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  title: string;
  data: {
    name: string;
    [key: string]: number | string;
  }[];
  dataKey: string;
  grid: boolean;
}

const Chart = ({ title, data, dataKey, grid }: ChartProps) => {
  return (
    <div className="mt-4 bg-white rounded-xl">
      <div className="mx-4 my-2">
        <h3 className="my-4 font-seimbold tracking-wider text-base">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#000" />
            <Line type="monotone" dataKey={dataKey} stroke="#000" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
