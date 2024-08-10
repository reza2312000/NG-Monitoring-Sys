import { useStateBasketContext } from "@/context/StateBasketContext";
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

const Charts = () => {
  const { dataTotal } = useStateBasketContext();

  const chartData =
    dataTotal?.map((item) => ({
      time: item.date,
      Jumlah_NG: item.totalNg || 0,
    })) || [];

  const sortedChartData = chartData.slice().sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeA - timeB;
  });

  return (
    <ResponsiveContainer width={"100%"} height={530}>
      <LineChart
        width={400}
        height={400}
        data={sortedChartData}
        margin={{
          top: 20,
          left: -18,
          right: 5,
          bottom: 35,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12 }}
          tickFormatter={(time) => {
            const date = new Date(time);
            const year = date.getFullYear().toString().slice(-2);
            const month = `0${date.getMonth() + 1}`.slice(-2);
            const day = `0${date.getDate()}`.slice(-2);
            return `${day}`;
          }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line
          type="monotone"
          dataKey="Jumlah_NG"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Charts;