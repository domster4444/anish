//@ts-nocheck

import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SingleLineChart() {
  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = ["Class1", "Class2", "Class3", "Class4", "Class5", "Class6", "Class7", "Class8", "Class9", "Class10", "Class11", "Class12"];

  const data = {
    labels,
    datasets: [
      {
        label: "Section",
        data: [4, 2, 3, 4, 2, 4, 3, 4, 3, 3, 4, 2, 1, 5, 4, 3, 2, 3, 4, 2, 3, 2, 4, 4, 2, 1, 2, 2, 3, 1, 4, 5, 3, 2, 3, 3, 4, 5, 4, 5, 3, 2, 4, 5, 4],
        backgroundColor: "#C182E0",
        barPercentage: 0.6, // Adjust this value to change the width of the bars
        categoryPercentage: 1, // Ensures bars are evenly spaced
        borderRadius: 10, // Sets the border radius for the bars
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default SingleLineChart;
