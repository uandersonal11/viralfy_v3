"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1e40af",
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 6,
      ticks: {
        stepSize: 1,
        color: "#64748b",
      },
      grid: {
        color: "#e2e8f0",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748b",
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
    },
  },
};

const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  datasets: [
    {
      data: [4, 5, 1, 2, 4, 1, 3, 3, 5, 0],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      fill: true,
      borderWidth: 2,
    },
  ],
};

export function UsageChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[300px]">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">USO DIÁRIO</h2>
      <div className="h-[calc(100%-4rem)]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}