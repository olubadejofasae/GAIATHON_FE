const lineChart = {
  series: [
    {
      name: "Mobile apps",
      data: [100, 350, 40, 300, 220, 500, 250, 400, 230, 500, 380, 420],
      offsetY: 0,
    },
    {
      name: "Websites",
      data: [50, 30, 90, 40, 140, 290, 290, 340, 230, 400, 310, 370],
      offsetY: 0,
    },
  ],


  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ]

    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

export default lineChart;
