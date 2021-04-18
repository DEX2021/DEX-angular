export const chartOptions = {
  chart: {
    type: "candlestick",
    animations: { enabled: true },
    toolbar: { show: true },
    width: "100%",
    height: "80%",
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    x: {
      show: false,
      format: "dd MMM",
      formatter: undefined,
    },
    y: {
      show: true,
      title: "price",
    },
    marker: {
      show: false,
    },
    items: {
      display: "flex",
    },
    fixed: {
      enabled: false,
      position: "topRight",
      offsetX: 0,
      offsetY: 0,
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "8px",
        cssClass: "apexcharts-xaxis-label",
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      minWidth: 0,
      maxWidth: 160,
      style: {
        colors: "#fff",
        fontSize: "12px",
        cssClass: "apexcharts-yaxis-label",
      },
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
    },
  },
};

export const dummyData = [
  {
    data: [
      {
        x: new Date(1617375581000),
        y: [0.81, 0.5, 0.04, 0.33],
      },
      {
        x: new Date(1617475581000),
        y: [0.01, 0.59, 0, 0.11],
      },
      {
        x: new Date(1617575581000),
        y: [0.71, 0.95, 0.34, 0.65],
      },
      {
        x: new Date(1617675581000),
        y: [0.65, 0.0, 0.67, 0.24],
      },
      {
        x: new Date(1617775581000),
        y: [0.24, 0.0, 0.0, 0.47],
      },
      {
        x: new Date(1617875581000),
        y: [0.53, 0.03, 0.68, 0.31],
      },
      {
        x: new Date(1617975581000),
        y: [0.61, 0.2, 0.0, 0.02],
      },
      {
        x: new Date(1618075581000),
        y: [0.0, 0.62, 0.22, 0.02],
      },
      {
        x: new Date(1618175581000),
        y: [0.0, 0.03, 0.95, 0.01],
      },
      {
        x: new Date(1618275581000),
        y: [0.5, 0.4, 0.26, 0.02],
      },
      {
        x: new Date(1618375581000),
        y: [0.02, 0.68, 0.99, 0.91],
      },
      {
        x: new Date(1618475581000),
        y: [0.91, 0.99, 0.01, 0.0],
      },
      {
        x: new Date(1618575581000),
        y: [0.2, 0.13, 0.09, 0.2],
      },
      {
        x: new Date(1618675581000),
        y: [0.02, 0.01, 0.09, 0.12],
      },
    ],
  },
];

var options = {
  series: [
    {
      name: "candle",
      data: [],
    },
  ],
  chart: {
    height: 450,
    type: "candlestick",
  },
  title: {
    text: "CandleStick Chart - Category X-axis",
    align: "left",
  },
  annotations: {
    xaxis: [
      {
        x: "Oct 06 14:00",
        borderColor: "#00E396",
        label: {
          borderColor: "#00E396",
          style: {
            fontSize: "12px",
            color: "#fff",
            background: "#00E396",
          },
          orientation: "horizontal",
          offsetY: 7,
          text: "Annotation Test",
        },
      },
    ],
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: "category",
    labels: {
      formatter: function (val) {
        return dayjs(val).format("MMM DD HH:mm");
      },
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};
