import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { chartDataRoute } from "../utils/apiRoutes";

ChartJS.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,);

const ChartArea = ({ symbol, setUpdateData }) => {
  const [data, setData] = useState({
    datasets: [
      {
        label: "Stocks",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  const [dataVolume, setDataVolume] = useState(data);
  const [dataBar, setDataBar] = useState(data);

  useEffect(() => {
    const call = async () => {
      const response = await axios.post(`${chartDataRoute}`, {
        symbol: symbol,
      });
      const responseData = response.data.response.map((ele) => {
        return ele.close;
      });
      const responseVolume = response.data.response.map((ele) => {
        return ele.volume;
      });
      const responseOpen = response.data.response.map((ele) => {
        return ele.open;
      });
      const responseClose = response.data.response.map((ele) => {
        return ele.close;
      });
      const newlabels = responseData.map((e) => {
        return "";
      });
      let newData = {
        labels: newlabels,
        datasets: [
          {
            label: "Stocks",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      newData.datasets[0].data = responseData;

      console.log("this this this", responseData, newData);
      setData(newData);
      let newVol = {
        labels: newlabels,
        datasets: [
          {
            label: "Stocks",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: "rgb(0, 0, 0)",
            tension: 0.1,
          },
        ],
      };

      const vol = newVol;

      vol.datasets[0].data = responseVolume;
      console.log("this this this new", newData);

      vol.datasets[0].label = "Volume";
      console.log("newVol=>>", vol, "newData=>>", newData);
      console.log("newhere=>>", responseVolume, "newhere=>>", responseData);
      setDataVolume(vol);
      // newData.datasets[0].data = responseOpen;
      // newData.datasets.push({
      //   label: "My First Dataset",
      //   data: [65, 59, 80, 81, 56, 55, 40],
      //   fill: true,
      //   borderColor: "rgb(75, 192, 192)",
      //   tension: 0.1,
      // })
      // newData.datasets[1].data = responseClose;

      setDataBar(newData);
      setUpdateData(newData);
      console.log(data, newData, responseData);
    };
    call();
  }, [symbol]);

  const optionsData = {
    mentainAspectRatio: false,
    fill:true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Price per Stock",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  const optionsVol = {
    mentainAspectRatio: false,
    fill:true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Volume Sold per Day",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  const handleChangeRange = async (range) => {
    const response = await axios.post(`${chartDataRoute}`, {
      symbol: symbol,
      range: range,
    });
    console.log("latestData", response.data);
    // const responseData = response.data.response.map((ele) => {
    //   return ele.close;
    // });
    // const newlabels = responseData.map((e) => {
    //   return "";
    // });
    // let newData = {
    //   labels: newlabels,
    //   datasets: [
    //     {
    //       label: "My First Dataset",
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //       fill: true,
    //       borderColor: "rgb(75, 192, 192)",
    //       tension: 0.1,
    //     },
    //   ],
    // };
    // newData.datasets[0].data = responseData;
    // setData(newData);

    const responseData = response.data.response.map((ele) => {
      return ele.close;
    });
    const responseVolume = response.data.response.map((ele) => {
      return ele.volume;
    });
    const responseOpen = response.data.response.map((ele) => {
      return ele.open;
    });
    const responseClose = response.data.response.map((ele) => {
      return ele.close;
    });
    const newlabels = responseData.map((e) => {
      return "";
    });
    let newData = {
      labels: newlabels,
      datasets: [
        {
          label: "Stocks",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    newData.datasets[0].data = responseData;
    setData(newData);
    let newVol = {
      labels: newlabels,
      datasets: [
        {
          label: "Volume Sold per Day",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: "rgb(0, 0, 0)",
          tension: 0.1,
        },
      ],
    };

    newVol.datasets[0].data = responseVolume;
    setDataVolume(newVol);
    // newData.datasets[0].data = responseOpen;
    // newData.datasets.push({
    //   label: "My First Dataset",
    //   data: [65, 59, 80, 81, 56, 55, 40],
    //   fill: true,
    //   borderColor: "rgb(75, 192, 192)",
    //   tension: 0.1,
    // })
    // newData.datasets[1].data = responseClose;
    // setDataBar(newData);
    setUpdateData(newData);
  };

  return (
    <ChartContainer>
      <div className="ranges">
        <button onClick={() => handleChangeRange("1w")}>1 Week</button>
        <button onClick={() => handleChangeRange("1m")}>1 Month</button>
        <button onClick={() => handleChangeRange("1y")}>1 Year</button>
        <button onClick={() => handleChangeRange("5y")}>5 Year</button>
      </div>
      <div className="chart">
        {/* <ChartRender data={data} options={options} /> */}
        <Line data={data} options={optionsData} />
      </div>
      <div className="chart">
        <Line data={dataVolume} options={optionsVol} />
      </div>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  // align-items: center;
  // width: 100%;
  // height: 100%;
  flex: 1.5;
  .chart {
    padding: 3%;
    box-sizing: border-box;
  }
  .ranges{
    button{
      padding: 5px;
      margin: 5px;
      border-radius: 5px;
      border: 1px solid green;
      background-color: white;
      margin-top: 15px;
      cursor: pointer;

      &:hover{
        background-color: #98fb98;
      }
      &:active{
        background-color: #50C878;
      } 
      &:focus{
        outline: none;
      }
    }
  }
`;

export default ChartArea;
