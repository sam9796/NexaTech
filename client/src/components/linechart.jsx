import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

function Linechart({ chartData, visibility, }) {
    
  return (
    <div
      className="chart-container"
      style={{ width: "750px", height: "300px", visibility: `${visibility}` }}
    >
      <Line
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

export default Linechart;