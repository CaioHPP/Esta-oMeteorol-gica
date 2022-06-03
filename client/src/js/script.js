/*import { getRecentes } from "./serviçoAPI.js";
import { getFiltrado } from "./serviçoAPI.js";
import { getDia } from "./serviçoAPI.js";
*/

window.onload = function () {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "# of Votes",
          data: [6, 5, 3, 5, 2, 3],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  console.log("ADSD");
};
