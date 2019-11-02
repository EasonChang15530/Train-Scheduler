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
    var getFirstTrainTime = $("#firstTrainTimeInput").val().trim();
    var gepulledFrequency = $("#frequencyInput").val().trim();

    // Creates local object for holding train data
    var trainInfo = {
      trainName: getTrainName,
      destination: getDestination,
      firstTrainTime: getFirstTrainTime,
      frequency: gepulledFrequency,
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

    // First Time (pushed back 1 year to make sure it comes before current time)
    var pulledFirstTrainTimeConverted = moment(pulledFirstTrainTime, "HH:mm").subtract(1, "years");
    console.log(pulledFirstTrainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("DD/MM/YYYY"));

    // Difference between the times
    var diffTime = moment().diff(moment(pulledFirstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log("-----------------");
    // Time apart (remainder)
    var remainder = diffTime % pulledFrequency;
    console.log(remainder);

    // Minute Until Train
    var minutesAway = pulledFrequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("hh:mm");
    
    var newRow = $("<tr>");
    var trainNameTd = $("<td>").text(pulledTrainName);
    var destinationTd = $("<td>").text(pulledDestination);
    var frequencyTd = $("<td>").text(pulledFrequency);
    var nextArrivalTd = $("<td>").text(nextArrival);
    var minutesAwayTd = $("<td>").text(minutesAway);
  
    newRow.append(trainNameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd);
    $("tbody").append(newRow);
  });

});