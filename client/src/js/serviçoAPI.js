const urlBackend = "http://127.0.0.1:3000/"; // url do backend

export function getRecentes() {
  // Função que retorna os recentes
  let result = axios.get(urlBackend + "leitura/recentes"); // chama o serviço
  result = result.then((response) => response.data); // pega o resultado da promise
  return result; // retorna o resultado
}

export function getFiltrado(datamin, datamax) {
  // Função que retorna os filtrados
  let result = axios.get(
    urlBackend + "leitura/filtrado?datamin=" + datamin + "&datamax=" + datamax
  ); // chama o serviço
  result = result.then((response) => response.data); // pega o resultado da promise
  return result; // retorna o resultado
}

export function getDia(data) {
  // Função que retorna os do dia
  let result = axios.get(urlBackend + "leitura/dia?data=" + data); // chama o serviço
  result = result.then((response) => response.data); // pega o resultado da promise
  return result; // retorna o resultado
}
