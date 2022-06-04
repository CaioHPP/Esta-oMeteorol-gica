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
        tipo: "Temperatura", // tipo
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
        tipo: "Pressao",
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
        data.push(umidadeRelativa.valor);
      });
      let datasetUmidadeRelativa = {
        label: umidadeRelativa.sensor,
        data: data,
        unidade: umidadeRelativa.unidade,
        tipo: "UmidadeRelativa",
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
        data.push(umidadeSolo.valor);
      });
      let datasetUmidadeSolo = {
        label: umidadeSolo.sensor,
        data: data,
        unidade: umidadeSolo.unidade,
        tipo: "UmidadeSolo",
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
        tipo: "mediaVelocidadeVento",
      };

      let datasetVelocidadeVentoMax = {
        label: velocidadeVento.sensor,
        data: data2,
        unidade: velocidadeVento.unidade,
        tipo: "maxVelocidadeVento",
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
        tipo: "DirecaoVento",
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
        tipo: "Precipitacao",
      };
      datasets.push(datasetPrecipitacao); // adiciona o dataset na lista
    });

    recentes.forEach((leitura) => {
      // percorre os recentes
      labels.push(new Date(leitura.createdAt).toLocaleTimeString()); // adiciona o horario da leitura ao array de labels
    });
  }

  preencherDatasets(); // preenche os datasets

  function datasetsTemperatura() {
    const datasetsTemperatura = datasets.filter(
      (dataset) => dataset.tipo === "Temperatura"
    );
    datasetsTemperatura.forEach((dataset) => {
      dataset.borderColor = "rgba(255, 99, 132, 1)";
      dataset.backgroundColor = "rgba(255, 99, 132, 0.5)";
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 5;
      dataset.pointBorderColor = "rgb(0, 0, 0)";
      dataset.yAxisID = "y";
    });
    return datasetsTemperatura;
  }

  function datasetsPressao() {
    const datasetsPressao = datasets.filter(
      (dataset) => dataset.tipo === "Pressao"
    );
    datasetsPressao.forEach((dataset) => {
      dataset.borderColor = "rgba(54, 162, 235, 1)";
      dataset.backgroundColor = "rgba(54, 162, 235, 0.5)";
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 5;
      dataset.pointBorderColor = "rgb(0, 0, 0)";
      dataset.yAxisID = "y1";
    });
    return datasetsPressao;
  }

  function datasetsUmidadeRelativa() {
    const datasetsUmidadeRelativa = datasets.filter(
      (dataset) => dataset.tipo === "UmidadeRelativa"
    );
    datasetsUmidadeRelativa.forEach((dataset) => {
      dataset.borderColor = "rgba(255, 206, 86, 1)";
      dataset.backgroundColor = "rgba(255, 206, 86, 0.5)";
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 5;
      dataset.pointBorderColor = "rgb(0, 0, 0)";
      dataset.yAxisID = "y1";
    });
    return datasetsUmidadeRelativa;
  }

  function datasetsUmidadeSolo() {
    const datasetsUmidadeSolo = datasets.filter(
      (dataset) => dataset.tipo === "UmidadeSolo"
    );
    datasetsUmidadeSolo.forEach((dataset) => {
      dataset.borderColor = "rgba(75, 192, 192, 1)";
      dataset.backgroundColor = "rgba(75, 192, 192, 0.5)";
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 5;
      dataset.pointBorderColor = "rgb(0, 0, 0)";
      dataset.yAxisID = "y1";
    });
    return datasetsUmidadeSolo;
  }

  function datasetsVelocidadeVentoMedia() {
    const datasetsVelocidadeVentoMedia = datasets.filter(
      (dataset) => dataset.tipo === "mediaVelocidadeVento"
    );
    datasetsVelocidadeVentoMedia.forEach((dataset) => {
      dataset.borderColor = "rgba(255, 159, 64, 1)";
      dataset.backgroundColor = "rgba(255, 159, 64, 0.5)";
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 5;
      dataset.pointBorderColor = "rgb(0, 0, 0)";
      dataset.yAxisID = "y";
    });
    return datasetsVelocidadeVentoMedia;
  }

  function datasetsVelocidadeVentoMax() {
    const datasetsVelocidadeVentoMax = datasets.filter(
      (dataset) => dataset.tipo === "maxVelocidadeVento"
    );
    datasetsVelocidadeVentoMax.forEach((dataset) => {
      dataset.borderColor = "rgba(255, 99, 132, 1)";
      dataset.backgroundColor = "rgba(255, 99, 132, 0.5)";
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 5;
      dataset.pointBorderColor = "rgb(0, 0, 0)";
      dataset.yAxisID = "y";
    });
    return datasetsVelocidadeVentoMax;
  }

  function datasetsDirecaoVento() {
    const datasetsDirecaoVento = datasets.filter(
      (dataset) => dataset.tipo === "DirecaoVento"
    );
    datasetsDirecaoVento.forEach((dataset) => {
      dataset.backgroundColor = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(201, 203, 207, 0.5)",
        "rgba(61, 226, 255, 0.5)",
      ];
    });
    return datasetsDirecaoVento;
  }

  function datasetsPrecipitacao() {
    const datasetsPrecipitacao = datasets.filter(
      (dataset) => dataset.tipo === "Precipitacao"
    );
    datasetsPrecipitacao.forEach((dataset) => {
      dataset.borderColor = "rgba(255, 99, 132, 1)";
      dataset.backgroundColor = "rgba(255, 99, 132, 0.5)";
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 5;
      dataset.pointBorderColor = "rgb(0, 0, 0)";
      dataset.yAxisID = "y";
      dataset.stack = "combined";
      dataset.type = "bar";
    });
    return datasetsPrecipitacao;
  }

  function geraConfiguracao(tipoGrafico, labels) {
    const data = {
      labels: labels,
      datasets: [],
    };
    const config = {};
    if (tipoGrafico === "Temperatura/UmidadeRelativa") {
      data.datasets.push(datasetsTemperatura());
      data.datasets.push(datasetsUmidadeRelativa());
      config.type = "line";
      config.options = {
        responsive: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: "Temperatura x Umidade Relativa",
          },
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Temperatura (°C)",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Umidade Relativa (%)",
            },
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      };
    }

    data.datasets = Object.values(data.datasets).flat();
    config.data = data;
    return config;
  }
  // </block:config>
  const ctx = document
    .getElementById("Temperatura/UmidadeRelativa")
    .getContext("2d");
  const myChart = new Chart(
    ctx,
    geraConfiguracao("Temperatura/UmidadeRelativa", labels)
  );
};
