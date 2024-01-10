import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Present", "Absent", "Late", "Sick", "Permit", "Day Off"],
  datasets: [
    {
      label: "# of Votes",
      data: [9, 13, 5, 2, 3],
      backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)", "rgba(255, 206, 86)", "rgba(75, 192, 192)", "rgba(153, 102, 255)"],
      borderColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)", "rgba(255, 206, 86)", "rgba(75, 192, 192)", "rgba(153, 102, 255)"],

      //  ? below are colors for attendance :
      // backgroundColor: ["#1B9C85", "#e35959", "#e3ad59", " #aaaaaa", "#39a2d9"],
      // borderColor: ["#1B9C85", "#e35959", "#e3ad59", " #aaaaaa", "#39a2d9"],
      borderWidth: 1,
    },
  ],
};

function PieChart() {
  return <Doughnut data={data} />;
}

export default PieChart;
