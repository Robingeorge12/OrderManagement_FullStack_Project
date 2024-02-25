import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar, Pie, Doughnut, PolarArea, Radar, Bubble, Scatter } from "react-chartjs-2";
function ChartPage({ data }) {
  const orderStatusAmounts = data.reduce((acc, order) => {
    if (!acc[order.order_status]) {
      acc[order.order_status] = 0;
    }
    acc[order.order_status] += order.order_amount;
    return acc;
  }, {});

  // Extract labels and data arrays
  const labels = Object.keys(orderStatusAmounts);
  const datas = Object.values(orderStatusAmounts);

  // Function to get color based on order status
  const getColor = (status) => {
    switch (status) {
      case "Ordered":
        return "rgba(255, 99, 132, 0.2)";
      case "Delivered":
        return "rgba(75, 192, 192, 0.2)";
      case "Return":
        return "rgba(255, 206, 86, 0.2)";
      case "Cancelled":
        return "rgba(54, 162, 235, 0.2)";
      default:
        return "rgba(255, 99, 132, 0.2)"; 
    }
  };

  return (
    <div className="">
      <h2
        style={{
          textAlign: "center",
          fontFamily: "system-ui",
          color: "darkblue",
        }}
      >
        Total Order Amount per Order Status
      </h2>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "",
              data: datas,
              backgroundColor: labels.map((label) => getColor(label)), 
              borderColor: labels.map((label) => getColor(label)),
              borderWidth: 1,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default ChartPage;