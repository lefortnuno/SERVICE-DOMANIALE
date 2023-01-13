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
        backgroundColor: "rgb(220,20,60)",
      },
      {
        label: "2nd.R",
        data: props.data3,
        backgroundColor: "rgb(255,105,180)",
      },
      {
        label: "D.A.S",
        data: props.data4,
        backgroundColor: "rgb(255,255,0)",
      },
      {
        label: "I.M",
        data: props.data5,
        backgroundColor: "rgb(255,0,255)",
      },
      {
        label: "BORNAGE",
        data: props.data6,
        backgroundColor: "rgb(255,99,71)",
      },
      {
        label: "REMISE",
        data: props.data7,
        backgroundColor: "rgb(75,0,130)",
      },
      {
        label: "F.L.C",
        data: props.data8,
        backgroundColor: "rgb(0,255,255)",
      },
      {
        label: "DECOMPTE",
        data: props.data9,
        backgroundColor: "rgb(173,255,47)",
      },
      {
        label: "P.A.V",
        data: props.data1,
        backgroundColor: "rgb(169,169,169)",
      },
      {
        label: "MUTATION",
        data: props.data10,
        backgroundColor: "rgb(0,255,0)",
      },
      // {
      //   label: "AVC",
      //   data: props.data11,
      //   backgroundColor: "rgb(255,0,0)",
      // },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
