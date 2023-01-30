import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { chartDataRoute } from "../utils/apiRoutes";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartRender = ({data, options}) => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartRender;
