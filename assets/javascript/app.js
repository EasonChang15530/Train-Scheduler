$(document).ready(function () {
  // 1. Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCejodQZy48h23IUmGpJim_Be2X-3t7A9U",
    authDomain: "bailing-app.firebaseapp.com",
    databaseURL: "https://bailing-app.firebaseio.com",
    projectId: "bailing-app",
    storageBucket: "bailing-app.appspot.com",
    messagingSenderId: "1045543733221",
    appId: "1:1045543733221:web:051c2555e16dcf00ee510c"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  // 2. Button for adding trainInfo
  $("#userSubmit").on("click", function (event) {

    event.preventDefault();

    // Capture User Inputs and store them into variables
    var getTrainName = $("#trainNameInput").val().trim();
    var getDestination = $("#destinationInput").val().trim();
    // This variable is not displayed
    // This line has question !!!
    var getFirstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("X");
    var getFrequency = $("#frequencyInput").val().trim();

    // Creates local object for holding train data
    var trainInfo = {
      trainName: getTrainName,
      destination: getDestination,
      firstTrainTime: getFirstTrainTime,
      frequency: getFrequency,
    };

    // Uploads train data to the database
    database.ref().push(trainInfo);

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
  });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store these train data pulled from firebase into variables.
    var pulledTrainName = childSnapshot.val().trainName;
    var pulledDestination = childSnapshot.val().destination;
    var pulledFirstTrainTime = childSnapshot.val().firstTrainTime;
    var pulledFrequency = childSnapshot.val().frequency;

    // // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
    // console.log(empStartPretty);
    // console.log("----------------------------");
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    var newRow = $("<tr>");
    var trainNameTd = $("<td>").text(pulledTrainName);
    var destinationTd = $("<td>").text(pulledDestination);
    var frequencyTd = $("<td>").text(pulledFrequency);
  
    newRow.append(trainNameTd, destinationTd, frequencyTd);
    $("tbody").append(newRow);
  });




});