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

export default function ChartGenerale(props) {
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
        label: "N.D",
        data: props.data1,
        backgroundColor: "rgb(8, 120, 239)",
      },
      {
        label: "C.E.L",
        data: props.data2,
        backgroundColor: "rgb(250, 140, 5)",
      },
      {
        label: "2nd.R",
        data: props.data3,
        backgroundColor: "rgba(239, 8, 8, 0.8)",
      },
      {
        label: "D.A.S",
        data: props.data4,
        backgroundColor: "rgb(8, 120, 239)",
      },
      {
        label: "I.M",
        data: props.data5,
        backgroundColor: "rgb(250, 140, 5)",
      },
      {
        label: "BORNAGE",
        data: props.data6,
        backgroundColor: "rgba(239, 8, 8, 0.8)",
      },
      {
        label: "REMISE",
        data: props.data7,
        backgroundColor: "rgb(8, 120, 239)",
      },
      {
        label: "F.L.C",
        data: props.data8,
        backgroundColor: "rgb(250, 140, 5)",
      },
      {
        label: "DECOMPTE",
        data: props.data9,
        backgroundColor: "rgba(239, 8, 8, 0.8)",
      },
      {
        label: "P.A.V",
        data: props.data1,
        backgroundColor: "rgb(8, 120, 239)",
      },
      {
        label: "MUTATION",
        data: props.data10,
        backgroundColor: "rgb(250, 140, 5)",
      },
      // {
      //   label: "AVC",
      //   data: props.data11,
      //   backgroundColor: "rgba(239, 8, 8, 0.8)",
      // },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
