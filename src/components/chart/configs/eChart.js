const eChart = {
  series: [
    {
      name: "Rainfall (mm)",
      data: [12, 18, 9, 22, 15, 11, 17],
      colors: '#FFFFFF'
    },
  ],


  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },
};

export default eChart;
