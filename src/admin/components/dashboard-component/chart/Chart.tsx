import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useWindow from "../../../../common/lib/useWindow";

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
  const { dimension } = useWindow();

  return (
    <div className="mt-4 rounded-xl bg-white">
      <div className="mx-4 my-2">
        <h3 className="font-seimbold my-4 text-base tracking-wider">{title}</h3>
        <ResponsiveContainer
          width="100%"
          aspect={dimension.width < 640 ? 2 / 1 : 4 / 1}
        >
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
