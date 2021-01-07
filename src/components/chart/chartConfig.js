const chartConfig = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    responsive: true,
    devicePixelRatio: 2,
    maintainAspectRatio: true,
    animation: {
      duration: 0,
    },
    tooltips: {
      intersect: false,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

export default chartConfig;
