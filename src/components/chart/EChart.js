import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Rainfall Prediction for this week</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+20%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Our forecast model has an 85% success rate in predicting rainfall
          events. This means that out of 100 predictions, we expect 85 to be
          accurate. The model is based on historical data and uses advanced
          algorithms to analyze patterns and trends in rainfall data.
        </Paragraph>
      </div>
    </>
  );
}

export default EChart;
