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
        y: [0.0081, 0.0005, 0.0004, 0.0033],
      },
      {
        x: new Date(1617475581000),
        y: [0.0001, 0.0059, 0.0000, 0.0011],
      },
      {
        x: new Date(1617575581000),
        y: [0.0071, 0.0095, 0.0034, 0.0065],
      },
      {
        x: new Date(1617675581000),
        y: [0.0065, 0.0000, 0.0067, 0.0024],
      },
      {
        x: new Date(1617775581000),
        y: [0.0024, 0.0000, 0.0000, 0.0047],
      },
      {
        x: new Date(1617875581000),
        y: [0.0053, 0.0003, 0.0068, 0.0031],
      },
      {
        x: new Date(1617975581000),
        y: [0.0061, 0.0002, 0.0002, 0.0000],
      },
      {
        x: new Date(1618075581000),
        y: [0.0000, 0.0062, 0.0022, 0.0002],
      },
      {
        x: new Date(1618175581000),
        y: [0.0000, 0.0003, 0.0095, 0.0001],
      },
      {
        x: new Date(1618275581000),
        y: [0.005, 0.004, 0.0026, 0.0002],
      },
      {
        x: new Date(1618375581000),
        y: [0.0002, 0.0068, 0.0099, 0.0091],
      },
      {
        x: new Date(1618475581000),
        y: [0.0091, 0.0099, 0.0001, 0.0000],
      },
      {
        x: new Date(1618575581000),
        y: [0.0002, 0.0013, 0.0009, 0.0002],
      },
      {
        x: new Date(1618675581000),
        y: [0.0002, 0.0001, 0.0009, 0.0012],
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
