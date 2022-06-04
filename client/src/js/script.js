import { getRecentes } from "./serviçoAPI.js"; // Importa o serviço
import { getFiltrado } from "./serviçoAPI.js"; // Importa o serviço
import { getDia } from "./serviçoAPI.js"; // Importa o serviço

window.onload = function () {
  const recentes = getRecentes().then((response) => {
    return response;
  });
  let ultimaLeitura = recentes[0];
  response.reverse();

  const datasets = [];
  function preencherDatasets(response) {
    response.forEach((leitura) => {
      if (leitura.isArray()){
        leitura.forEach((leitura) => {
          );
        }

      }
      }

  response.forEach(function (leitura) {
    myChart.data.datasets.forEach((dataset, indice) => {
      if (indice < leitura.Temperatura.length) {
        dataset.data.push(leitura.Temperatura[indice].valor / 10);
      } else {
        dataset.data.push(leitura.UmidadeRelativa[0].valor);
      }
    });
    myChart.data.labels.push(new Date(leitura.createdAt).toLocaleTimeString());
  });

  const labels = [];

  const ctx = document.getElementById("myChart").getContext("2d");

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperatura - Sensor 1",
        data: [],
        borderColor: "#B71212",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Temperatura - Sensor 2",
        data: [],
        borderColor: "#8B0000",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Temperatura - Sensor 3",
        data: [],
        borderColor: "#D13287",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Umidade Relativa - Sensor 1",
        labelColor: "#1A00FF",
        data: [],
        borderColor: "#1A00FF",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: false,
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

  getRecentes().then(function (response) {
    console.log(myChart.data.labels);
    myChart.update();
  });
  console.log("ADSD");
};
