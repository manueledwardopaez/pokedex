const ctx = document.getElementById("stats");

export function createChart(stats) {
  return new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "HP",
        "Attack",
        "Defense",
        ["Special", "Attack"],
        ["Special", "Defense"],
        "Speed",
      ],
      datasets: [{
        data: stats,
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        r: {
          grid: {
            color: 'white'
          },
          pointLabels: {
            color: 'white'
          },
          angleLines: {
            color: 'white'
          }
        }
      }
    }
  });
}
