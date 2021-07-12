var ctx = document.getElementById("myChart");
const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};
const config = {
  type: "line",
  data: data,
};

var myChart = new Chart(ctx, config);
// var month = new Array();
// month[0] = "January";
// month[1] = "February";
// month[2] = "March";
// month[3] = "April";
// month[4] = "May";
// month[5] = "June";
// month[6] = "July";
// month[7] = "August";
// month[8] = "September";
// month[9] = "October";
// month[10] = "November";
// month[11] = "December";
// var dt = new Date("2020-04-29T00:00:00Z");
// var mon = month[dt.getMonth()];
// console.log(mon);
//<canvas id="myChart" width="50" height="50"></canvas>
