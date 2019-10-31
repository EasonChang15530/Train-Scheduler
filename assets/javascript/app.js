// Capture Button Click
$(".btn-primary").on("click", function (event) {
  // prevent form from trying to submit/refresh the page
  event.preventDefault();

  // Capture User Inputs and store them into variables
  var name = $("#employee-name-input").val().trim();
  var role = $("#role-input").val().trim();
  var start = $("#start-input").val().trim();
  var rate = $("#rate-input").val().trim();
  // var month = 9;
  // var total = rate * month;


  // Console log each of the user inputs to confirm we are receiving them
  // console.log(name);
  // console.log(role);
  // console.log(start);
  // console.log(rate);

  var newRow = $("<tr>");

  var nameTd = $("<td>").text(name);
  var roleTd = $("<td>").text(role);
  var startdateTd = $("<td>").text(start);
  var monthlyrateTd = $("<td>").text(rate);
  // var monthsworkedTd = $("<td>").text(month);
  // var totalbilledTd = $("<td>").text(total);


  // nameTd.text(name);

  newRow.append(nameTd, roleTd, startdateTd, monthlyrateTd);

  $("tbody").append(newRow);


  // // Assumptions
  // var tFrequency = 3;

  // // Time is 3:30 AM
  // var firstTime = "03:30";

  // // First Time (pushed back 1 year to make sure it comes before current time)
  // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  // console.log(firstTimeConverted);

  // Current Time

  var dateFormat = "MM/DD/YYYY";
  var convertedDate = moment(startdateTd, dateFormat);
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("DD/MM/YYYY"));
  console.log(convertedDate.format("MM/DD/YY"));
  console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss"));
  console.log(convertedDate.format("X"));
  // console.log(convertedDate.format("X"));
  // Difference between the times
  console.log(convertedDate.toNow());
  console.log("----------------------------------------");
  var diffTime = moment().diff(moment(convertedDate), "months");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // // Time apart (remainder)
  // var tRemainder = diffTime % tFrequency;
  // console.log(tRemainder);

  // // Minute Until Train
  // var tMinutesTillTrain = tFrequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // // Next Train
  // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
});
