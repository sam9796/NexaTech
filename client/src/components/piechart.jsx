import React from "react";
import { Pie } from "react-chartjs-2";

function Piechart({ chartData, visibility }) {
  return (
    <div
      className="chart-container"
      style={{ width: "750px", height: "300px", visibility: `${visibility}` }}
    >
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "",
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
}

export default Piechart;