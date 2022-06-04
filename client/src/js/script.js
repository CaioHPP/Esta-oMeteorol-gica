import { getRecentes } from "./serviçoAPI.js"; // Importa o serviço
import { getFiltrado } from "./serviçoAPI.js"; // Importa o serviço
import { getDia } from "./serviçoAPI.js"; // Importa o serviço

window.onload = async function () {
  const recentes = await getRecentes().then(({ data }) => {
    return data;
  });

  let ultimaLeitura = recentes[0]; // pega a ultima leitura
  recentes.reverse(); // inverte a ordem

  function retornaLeiturasPorSensor(nomeSensor, unidade) {
    const lista = recentes.map((leitura) => {
      leitura = Object.values(leitura).flat();
      return leitura.find(
        (valor) => valor.sensor === nomeSensor && valor.unidade === unidade
      );
    });
    return lista;
  }

  const labels = [];
  const datasets = []; // cria um array de datasets
  function preencherDatasets() {
    // função que preenche o array de datasets
    ultimaLeitura.Temperatura.forEach((temperatura) => {
      // percorre as temperaturas
      const leitura = retornaLeiturasPorSensor(
        temperatura.sensor,
        temperatura.unidade
      ); // pega as leituras do sensor
      let data = []; // cria um array de dados
      leitura.forEach((temperatura) => {
        // percorre as leituras
        data.push(temperatura.valor); // adiciona o valor da leitura ao array de dados
      });
      let datasetTemperatura = {
        // cria o dataset da temperatura
        label: temperatura.sensor, // nome do sensor
        data: data, // dados
        unidade: temperatura.unidade, // unidade
      };
      datasets.push(datasetTemperatura); // adiciona o dataset na lista
    });

    ultimaLeitura.Pressao.forEach((pressao) => {
      // percorre as pressões
      const leitura = retornaLeiturasPorSensor(pressao.sensor, pressao.unidade); // pega as leituras do sensor
      let data = [];
      leitura.forEach((pressao) => {
        data.push(pressao.valor / 10);
      });
      let datasetPressao = {
        label: pressao.sensor,
        data: data,
        unidade: pressao.unidade,
      };
      datasets.push(datasetPressao); // adiciona o dataset na lista
    });

    ultimaLeitura.UmidadeRelativa.forEach((umidadeRelativa) => {
      // percorre as umidades relativas
      const leitura = retornaLeiturasPorSensor(
        umidadeRelativa.sensor,
        umidadeRelativa.unidade
      );
      let data = [];
      leitura.forEach((umidadeRelativa) => {
        data.push(umidadeRelativa.valor / 10);
      });
      let datasetUmidadeRelativa = {
        label: umidadeRelativa.sensor,
        data: data,
        unidade: umidadeRelativa.unidade,
      };
      datasets.push(datasetUmidadeRelativa); // adiciona o dataset na lista
    });

    ultimaLeitura.UmidadeSolo.forEach((umidadeSolo) => {
      // percorre as umidades solares
      const leitura = retornaLeiturasPorSensor(
        umidadeSolo.sensor,
        umidadeSolo.unidade
      );
      let data = [];
      leitura.forEach((umidadeSolo) => {
        data.push(umidadeSolo.valor / 10);
      });
      let datasetUmidadeSolo = {
        label: umidadeSolo.sensor,
        data: data,
        unidade: umidadeSolo.unidade,
      };
      datasets.push(datasetUmidadeSolo); // adiciona o dataset na lista
    });

    ultimaLeitura.VelocidadeVento.forEach((velocidadeVento) => {
      // percorre as velocidades de vento
      const leitura = retornaLeiturasPorSensor(
        velocidadeVento.sensor,
        velocidadeVento.unidade
      );
      let data = [];
      let data2 = [];
      leitura.forEach((velocidadeVento) => {
        data.push(velocidadeVento.media / 10); // pega a media da velocidade de vento
        data2.push(velocidadeVento.maximo / 10); // pega o maximo da velocidade de vento
      });
      let datasetVelocidadeVentoMedia = {
        label: velocidadeVento.sensor,
        data: data,
        unidade: velocidadeVento.unidade,
        tipo: "media",
      };

      let datasetVelocidadeVentoMax = {
        label: velocidadeVento.sensor,
        data: data2,
        unidade: velocidadeVento.unidade,
        tipo: "max",
      };
      datasets.push(datasetVelocidadeVentoMedia); // adiciona o dataset na lista
      datasets.push(datasetVelocidadeVentoMax); // adiciona o dataset na lista
    });

    ultimaLeitura.DirecaoVento.forEach((direcaoVento) => {
      // percorre as direções de vento
      const leitura = retornaLeiturasPorSensor(
        direcaoVento.sensor,
        direcaoVento.unidade
      );
      let data = [];
      leitura.forEach((direcaoVento) => {
        data.push(direcaoVento.valor / 10);
      });
      let datasetDirecaoVento = {
        label: direcaoVento.sensor,
        data: data,
        unidade: direcaoVento.unidade,
      };
      datasets.push(datasetDirecaoVento);
    });

    ultimaLeitura.Precipitacao.forEach((precipitacao) => {
      // percorre as precipitações
      const leitura = retornaLeiturasPorSensor(
        precipitacao.sensor,
        precipitacao.unidade
      );
      let data = [];
      leitura.forEach((precipitacao) => {
        data.push(precipitacao.valor / 10);
      });
      let datasetPrecipitacao = {
        label: precipitacao.sensor,
        data: data,
        unidade: precipitacao.unidade,
      };
      datasets.push(datasetPrecipitacao); // adiciona o dataset na lista
    });

    recentes.forEach((leitura) => {
      // percorre os recentes
      labels.push(new Date(leitura.createdAt).toLocaleTimeString()); // adiciona o horario da leitura ao array de labels
    });
  }

  preencherDatasets(); // preenche os datasets
  console.log(datasets);

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
};
