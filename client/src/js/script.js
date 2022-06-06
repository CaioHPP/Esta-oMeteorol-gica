import { getRecentes } from "./serviçoAPI.js"; // Importa o serviço
import { getFiltrado } from "./serviçoAPI.js"; // Importa o serviço
import { getDia } from "./serviçoAPI.js"; // Importa o serviço

window.onload = async function () {
  const recentes = await getRecentes().then(({ data }) => {
    return data;
  });

  let mediaDirecaoVento = "";
  let mediaVelocidadeVento = [];
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
        data.push(temperatura.valor / 10); // adiciona o valor da leitura ao array de dados
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
        mediaVelocidadeVento.push(velocidadeVento.media * 0.36);
        data.push(velocidadeVento.media * 0.36); // pega a media da velocidade de vento
        data2.push(velocidadeVento.maximo * 0.36); // pega o maximo da velocidade de vento
      });
      console.log(mediaVelocidadeVento);
      mediaVelocidadeVento =
        mediaVelocidadeVento.reduce((a, b) => a + b, 0) /
        mediaVelocidadeVento.length;

      let datasetVelocidadeVentoMedia = {
        label: `${velocidadeVento.sensor} - Media`,
        data: data,
        unidade: "km/h",
        tipo: "mediaVelocidadeVento",
      };

      let datasetVelocidadeVentoMax = {
        label: `${velocidadeVento.sensor} - Rajadas`,
        data: data2,
        unidade: "km/h",
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
      const leitura2 = retornaLeiturasPorSensor(
        ultimaLeitura.VelocidadeVento[0].sensor,
        ultimaLeitura.VelocidadeVento[0].unidade
      );

      let data = [];

      leitura.forEach((direcaoVento, indice) => {
        if (leitura2[indice].media > 0) {
          if (direcaoVento.valor <= 22.5 || direcaoVento.valor >= 337.5) {
            data.push("N");
          } else if (direcaoVento.valor <= 67.5) {
            data.push("NE");
          } else if (direcaoVento.valor <= 112.5) {
            data.push("L");
          } else if (direcaoVento.valor <= 157.5) {
            data.push("SE");
          } else if (direcaoVento.valor <= 202.5) {
            data.push("S");
          } else if (direcaoVento.valor <= 247.5) {
            data.push("SO");
          } else if (direcaoVento.valor <= 292.5) {
            data.push("O");
          } else if (direcaoVento.valor <= 337.5) {
            data.push("NO");
          }
        }
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

    ultimaLeitura.Altitude.forEach((altitude) => {
      // percorre as altitudes
      const leitura = retornaLeiturasPorSensor(
        altitude.sensor,
        altitude.unidade
      );
      let data = [];
      leitura.forEach((altitude) => {
        data.push(altitude.valor / 10);
      });
      let datasetAltitude = {
        label: altitude.sensor,
        data: data,
        unidade: altitude.unidade,
        tipo: "Altitude",
      };
      datasets.push(datasetAltitude); // adiciona o dataset na lista
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
      dataset.borderWidth = 4;
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 6;
      dataset.pointHoverRadius = 10;
      dataset.pointHoverBackgroundColor = "rgba(0, 0, 0, 1)";
      dataset.pointBorderColor = "rgba(255, 99, 132, 0.5)";
      dataset.yAxisID = "y";
      dataset.cubicInterpolationMode = "monotone";
      dataset.tension = 0.4;
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
      dataset.borderWidth = 4;

      dataset.pointRadius = 3;
      dataset.pointHoverRadius = 10;
      dataset.pointHoverBackgroundColor = "rgba(0, 0, 0, 1)";
      dataset.pointBorderColor = "rgba(54, 162, 235, 0.5)";
      dataset.yAxisID = "y1";
      dataset.cubicInterpolationMode = "monotone";
      dataset.tension = 0.4;
      dataset.stack = "combined";
    });
    return datasetsPressao;
  }

  function datasetsUmidadeRelativa() {
    const datasetsUmidadeRelativa = datasets.filter(
      (dataset) => dataset.tipo === "UmidadeRelativa"
    );
    datasetsUmidadeRelativa.forEach((dataset) => {
      dataset.borderColor = "rgba(54, 162, 235, 1)";
      dataset.backgroundColor = "rgba(54, 162, 235, 0.5)";
      dataset.borderWidth = 4;
      dataset.pointRadius = 3;
      dataset.pointHoverRadius = 10;
      dataset.pointHoverBackgroundColor = "rgba(54, 162, 235, 1)";
      dataset.pointBorderColor = "rgba(54, 162, 235, 0.5)";
      dataset.yAxisID = "y1";
      dataset.cubicInterpolationMode = "monotone";
      dataset.tension = 0.4;
    });
    return datasetsUmidadeRelativa;
  }

  function datasetsUmidadeSolo() {
    const datasetsUmidadeSolo = datasets.filter(
      (dataset) => dataset.tipo === "UmidadeSolo"
    );
    datasetsUmidadeSolo.forEach((dataset) => {
      dataset.borderColor = "rgb(160, 66, 11)";
      dataset.backgroundColor = "rgba(160, 66, 11, 0.5)";
      dataset.borderWidth = 4;
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 7;
      dataset.pointHoverRadius = 10;
      dataset.pointHoverBackgroundColor = "rgb(160, 66, 11)";
      dataset.pointBorderColor = "rgba(160, 66, 11, 0.5)";
      dataset.yAxisID = "y2";
      dataset.cubicInterpolationMode = "monotone";
      dataset.tension = 0.4;
    });
    return datasetsUmidadeSolo;
  }

  function datasetsVelocidadeVentoMedia() {
    const datasetsVelocidadeVentoMedia = datasets.filter(
      (dataset) => dataset.tipo === "mediaVelocidadeVento"
    );
    datasetsVelocidadeVentoMedia.forEach((dataset) => {
      dataset.borderColor = "black";
      dataset.backgroundColor = "rgba(0, 0, 0, 0.5)";
      dataset.borderWidth = 4;
      dataset.pointRadius = 3;
      dataset.pointHoverRadius = 10;
      dataset.pointHoverBackgroundColor = "rgba(0, 0, 0, 1)";
      dataset.pointBorderColor = "rgba(0, , 0, 0.5)";
      dataset.yAxisID = "y";
      dataset.cubicInterpolationMode = "monotone";
      dataset.tension = 0.4;
    });

    return datasetsVelocidadeVentoMedia;
  }

  function datasetsVelocidadeVentoMax() {
    const datasetsVelocidadeVentoMax = datasets.filter(
      (dataset) => dataset.tipo === "maxVelocidadeVento"
    );
    datasetsVelocidadeVentoMax.forEach((dataset) => {
      dataset.borderColor = "black";
      dataset.backgroundColor = "rgba(0, 0, 0, 0.0)";
      dataset.borderWidth = 4;
      dataset.pointRadius = 3;
      dataset.pointHoverRadius = 10;
      dataset.pointHoverBackgroundColor = "rgba(0, 0, 0, 1)";
      dataset.pointBorderColor = "rgba(0, 0, 0)";
      dataset.yAxisID = "y";
      dataset.cubicInterpolationMode = "monotone";
      dataset.tension = 0.4;
      dataset.borderDash = [2, 2];
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
      dataset.borderAlign = "inner";
    });
    return datasetsDirecaoVento;
  }

  function datasetsPrecipitacao() {
    const datasetsPrecipitacao = datasets.filter(
      (dataset) => dataset.tipo === "Precipitacao"
    );
    datasetsPrecipitacao.forEach((dataset) => {
      dataset.borderColor = "rgba(75, 192, 192, 0.3)";
      dataset.backgroundColor = "rgba(75, 192, 192, 0.3)";
      dataset.borderWidth = 4;
      dataset.pointStyle = "rectRot";
      dataset.pointRadius = 7;
      dataset.pointHoverRadius = 10;
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
        responsive: true,
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
          tooltip: {
            callbacks: {
              label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} ${item.dataset.unidade}`,
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
              color: "rgba(255, 99, 132, 1)",
            },
            ticks: {
              color: "rgba(255, 99, 132, 1)",
              callback: function (value, index, values) {
                return value + " °C";
              },
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Umidade Relativa (%)",
              color: "rgba(54, 162, 235, 1)",
            },
            ticks: {
              color: "rgba(54, 162, 235, 1)",
              callback: function (value, index, values) {
                return value + " %";
              },
            },
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      };
    }
    if (tipoGrafico === "Precipitacao/Pressao") {
      data.datasets.push(datasetsPrecipitacao());
      data.datasets.push(datasetsPressao());
      config.type = "line";
      config.options = {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: true,
        plugins: {
          title: {
            display: true,
            text: "Precipitação x Pressão",
          },
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
          tooltip: {
            callbacks: {
              label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} ${item.dataset.unidade}`,
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
              text: "Precipitação (mm)",
              color: "rgba(75, 192, 192, 1)",
            },
            ticks: {
              color: "rgba(75, 192, 192, 1)",
              callback: function (value, index, values) {
                return value + " mm";
              },
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Pressão (hPa)",
              color: "rgba(54, 162, 235, 1)",
            },
            ticks: {
              color: "rgba(54, 162, 235, 1)",
              callback: function (value, index, values) {
                return value + " hPa";
              },
            },

            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      };
    }
    if (tipoGrafico === "DirecaoVento") {
      let datasets = datasetsDirecaoVento(); // datasetsDirecaoVento

      data.labels = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"]; // labels
      let norte = 0;
      let nordeste = 0;
      let leste = 0;
      let sudeste = 0;
      let sul = 0;
      let sudoeste = 0;
      let oeste = 0;
      let noroeste = 0;

      datasets.forEach((dataset) => {
        // datasetsDirecaoVento
        dataset.data.forEach((data) => {
          if (data === "N") {
            norte++;
          }
          if (data === "NE") {
            nordeste++;
          }
          if (data === "L") {
            leste++;
          }
          if (data === "SE") {
            sudeste++;
          }
          if (data === "S") {
            sul++;
          }
          if (data === "SO") {
            sudoeste++;
          }
          if (data === "O") {
            oeste++;
          }
          if (data === "NO") {
            noroeste++;
          }
        });
        dataset.data = [
          (norte * 100) / dataset.data.length,
          (nordeste * 100) / dataset.data.length,
          (leste * 100) / dataset.data.length,
          (sudeste * 100) / dataset.data.length,
          (sul * 100) / dataset.data.length,
          (sudoeste * 100) / dataset.data.length,
          (oeste * 100) / dataset.data.length,
          (noroeste * 100) / dataset.data.length,
        ];
        data.datasets.push(dataset);
      });
      mediaDirecaoVento = Math.max(...data.datasets[0].data);
      mediaDirecaoVento = data.datasets[0].data.indexOf(mediaDirecaoVento);
      mediaDirecaoVento = data.labels[mediaDirecaoVento];
      config.type = "polarArea";
      config.options = {
        responsive: true,
        scales: {
          r: {
            startAngle: -22.5,
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 18,
              },
              color: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(201, 203, 207, 1)",
                "rgba(61, 226, 255, 1)",
              ],
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Direção Do Vento",
          },
          tooltip: {
            callbacks: {
              label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} %`,
            },
          },
        },
      };
    }
    if (tipoGrafico === "VelocidadesVento") {
      data.datasets.push(datasetsVelocidadeVentoMax());
      data.datasets.push(datasetsVelocidadeVentoMedia());

      config.type = "line";
      config.options = {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: "Velocidade Do Vento",
          },
          legend: {
            labels: {
              boxHeight: 1,
              boxWidth: 40,
              usePointStyle: false,
            },
          },
          tooltip: {
            callbacks: {
              label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} ${item.dataset.unidade}`,
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
              text: "Velocidade (km/h)",
            },
            ticks: {
              color: "black",
              callback: function (value, index, values) {
                return value + " km/h";
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      };
    }

    if (tipoGrafico === "Precipitacao/UmidadeRelativa/UmidadeSolo") {
      data.datasets.push(datasetsPrecipitacao());
      data.datasets.push(datasetsUmidadeRelativa());
      data.datasets.push(datasetsUmidadeSolo());
      config.type = "line";
      config.options = {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: true,
        plugins: {
          title: {
            display: true,
            text: "Precipitação x Umidade Relativa x Umidade do Solo",
          },
          tooltip: {
            callbacks: {
              label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} ${item.dataset.unidade}`,
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
              text: "Precipitação (mm)",
              color: "rgba(75, 192, 192, 1)",
            },
            ticks: {
              color: "rgba(75, 192, 192, 1)",
              callback: function (value, index, values) {
                return value + " mm";
              },
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Umidade Relativa (%)",
              color: "rgba(54, 162, 235, 1)",
            },
            ticks: {
              color: "rgba(54, 162, 235, 1)",
              callback: function (value, index, values) {
                return value + " %";
              },
              padding: 5,
            },
            grid: {
              display: false,
            },
          },
          y2: {
            grid: {
              display: false,
            },
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Umidade do Solo (%)",
              color: "rgb(160, 66, 11)",
            },
            ticks: {
              color: "rgb(160, 66, 11)",
              callback: function (value, index, values) {
                return value + " %";
              },
            },
          },

          x: {
            grid: {
              display: false,
            },
          },
        },
      };
    }

    data.datasets = Object.values(data.datasets).flat();
    config.data = data;
    return config;
  }

  const graficos = document.querySelectorAll("[tipo-grafico]");

  graficos.forEach((grafico) => {
    const id = grafico.getAttribute("id");
    const tipoGrafico = grafico.getAttribute("tipo-grafico");
    const aplicaGrafico = new Chart(id, geraConfiguracao(tipoGrafico, labels));
  });

  const atualizaUltimaLeitura = () => {
    document.getElementById("temperaturaAtual").innerHTML = `${
      ultimaLeitura.Temperatura[0].valor / 10
    } ºC`;
    document.getElementById(
      "umidadeRelativaAtual"
    ).innerHTML = `${ultimaLeitura.UmidadeRelativa[0].valor} %`;
    document.getElementById(
      "horarioAtual"
    ).innerHTML = `Atualizado às ${new Date(
      ultimaLeitura.createdAt
    ).toLocaleTimeString()}`;
    document.getElementById(
      "velocidadeVentoAtual"
    ).innerHTML = `${mediaVelocidadeVento.toFixed(1)} km/h`;

    if (mediaDirecaoVento == "N") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(0deg)";
    }
    if (mediaDirecaoVento == "NE") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(45deg)";
    }
    if (mediaDirecaoVento == "L") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(90deg)";
    }
    if (mediaDirecaoVento == "SE") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(135deg)";
    }
    if (mediaDirecaoVento == "S") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(180deg)";
    }
    if (mediaDirecaoVento == "SO") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(225deg)";
    }
    if (mediaDirecaoVento == "O") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(270deg)";
    }
    if (mediaDirecaoVento == "NO") {
      document.getElementById("direcaoVentoAtual").style.transform =
        "rotate(315deg)";
    }

    document.getElementById("precipitacaoAtual").innerHTML = `${
      ultimaLeitura.Precipitacao[0].valor / 10
    } mm`;
    document.getElementById("pressaoAtual").innerHTML = `${
      ultimaLeitura.Pressao[0].valor / 10
    } hPa`;
    document.getElementById(
      "altitudeAtual"
    ).innerHTML = `${ultimaLeitura.Altitude[0].valor} m`;
  };

  atualizaUltimaLeitura(); // atualiza a ultima leitura
};
