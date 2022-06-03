import { axios } from "./../../node_modules/axios/index.js";
const urlBackend = "http://192.168.237.80:3000/";

export function getRecentes() {
  return axios.get(urlBackend + "leitura/recentes");
}

export function getFiltrado(datamin, datamax) {
  return axios.get(
    urlBackend + "leitura/filtrado?datamin=" + datamin + "&datamax=" + datamax
  );
}

export function getDia(data) {
  return axios.get(urlBackend + "leitura/dia?data=" + data);
}
