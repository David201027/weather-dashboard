import React from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { formatChartHour } from "../utils/dateFormatter";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const WeatherChart = ({ forecast }) => {
  const dataList = forecast.list.slice(0, 8);

  const data = {
    labels: dataList.map((item) => formatChartHour(item.dt)),
    datasets: [{ label: "Temperature °C", data: dataList.map((item) => item.main.temp) }],
  };

  return (
    <div className="line-div">
      <Line data={data} />
    </div>
  );
};

export default WeatherChart;