import React from "react";
import { Bar } from "react-chartjs-2";

function Mychart({ chartData, visibility }) {
  return (
    <div
      className="chart-container"
      style={{ width: "750px", height: "300px", visibility: `${visibility}` }}
    >
      <Bar
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

export default Mychart;