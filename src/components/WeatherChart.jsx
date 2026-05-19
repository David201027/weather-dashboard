import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const WeatherChart = ({ forecast }) => {
  const dataList = forecast.list.slice(0, 8);

  const data = {
    labels: dataList.map((item) =>
      new Date(item.dt * 1000).getHours() + ":00"
    ),
    datasets: [
      {
        label: "Temperature °C",
        data: dataList.map((item) => item.main.temp),
      },
    ],
  };

  return (
    <div className="line-div" style={{}}>
      <Line data={data} />
    </div>
  );
};

export default WeatherChart;