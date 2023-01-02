import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartDossier(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Diagramme en Batton ",
      },
    },
  };


  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "V",
        data: props.data1,
        backgroundColor: "rgb(8, 120, 239)",
      },
      {
        label: "AX",
        data: props.data2,
        backgroundColor: "rgb(250, 140, 5)",
      },
      {
        label: "X",
        data: props.data3,
        backgroundColor: "rgba(239, 8, 8, 0.8)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
