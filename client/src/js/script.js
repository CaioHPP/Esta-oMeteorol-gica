import { getRecentes } from "./serviçoAPI.js"; // Importa o serviço
import { getFiltrado } from "./serviçoAPI.js"; // Importa o serviço
import { getDia } from "./serviçoAPI.js"; // Importa o serviço

window.onload = function () {
  getRecentes().then(function (response) {
    console.log(response);
    response.forEach(function (leitura) {
      chart.data.datasets.forEach((dataset, indice) => {
        if (indice < leitura.Temperatura.length) {
          dataset.data.push(leitura.Temperatura[indice]);
        }
      });
    });
    chart.update();
  });

  const ctx = document.getElementById("myChart").getContext("2d");

  const labels = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperatura - Sensor 1",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Temperatura - Sensor 2",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Temperatura - Sensor 3",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Umidade Relativa - Sensor 1",
        data: [5, 5, 5, 5, 5, 5, 5],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
    ],
  };
  // </block:setup>

  // <block:config:0>
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: "Chart.js Line Chart - Multi Axis",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  };
  // </block:config>

  const myChart = new Chart(ctx, config);
  console.log("ADSD");
};
