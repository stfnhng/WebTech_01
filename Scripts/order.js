$(document).ready(function() {
  // Initialize the movie list
  var movieList = $("#movie-select option");

  // Search for a movie
  $("#movie-select").change(function() {
    var movieId = $("#movie-select").val();
    $.ajax({
      type: "GET",
      url: "/getTimeslots",
      data: { movie_id: movieId },
      success: function(data) {
        var timeslots = "";
        var now = new Date();
        $.each(data, function(index, value) {
          var time = new Date(value.time);
          var availability = value.availability;
          // compare the current date and time with the timeslot time to ensure only timeslots in the future will be shown
          if (time > now && availability > 0) {
            timeslots += "<button class='timeslot-button' data-time='" + value.time + "' data-movie-id='" + value.movie_id + "' data-id='" + value.id + "' data-start-time='" + time.getTime() + "'>" + value.time + "</button>";
          }
        });
        $("#timeslot-list").html(timeslots);
      },
      error: function() {
        alert("Error retrieving timeslots.");
      }
    });
  });

  var currentPopup = null;

  $(document).on("click", ".timeslot-button", function() {
    var timeslot = $(this).data("time");
    var startTime = $(this).data("start-time");

    // Close the current popup if there is one
    if (currentPopup) {
      currentPopup.remove();
    }

    // Get the movie title
    var movieTitle = $("#movie-select option:selected").text();

    // Check if the movie is starting in less than 2 hours, if so, show warning on the popup.
    var timeDiff = startTime - Date.now();
    if (timeDiff <= 7200000) {
      var minutes = Math.floor(timeDiff / 60000);
      var popup = $("<div id='popup'><p>You've selected the timeslot: <b>" + timeslot + "</b><br/>for the movie: <b>" + movieTitle + "</b></p><p style='color:red;'>The movie is starting in " + minutes + " minutes!</p><label for='amount'><b>Amount:</b></label><input type='number' id='amount' value='1' min='1' /><button id='purchase-button' data-id='" + $(this).data('id') + "'>Purchase</button><button id='cancel-button'>Cancel</button></div>");
    } else {
 
      var popup = $("<div id='popup'><p>You've selected the timeslot: <b>" + timeslot + "</b><br/>for the movie: <b>" + movieTitle + "</b></p><label for='amount'><b>Amount:</b></label><input type='number' id='amount' value='1' min='1' /><button id='purchase-button' data-id='" + $(this).data('id') + "'>Purchase</button><button id='cancel-button'>Cancel</button></div>");
    }

    popup.find("#cancel-button").click(function() {
        popup.remove();
        currentPopup = null;
    });

    $(".container").append(popup);
    currentPopup = popup;
  });

  //making a purchase
  $(document).on("click", "#purchase-button", function() {
    var scheduleId = $(this).data('id');
    var amount = $("#amount").val();
    console.log(scheduleId);
    // Send the purchase request to the server
    $.ajax({
      type: "POST",
      url: "/purchase",
      data: {
        scheduleId: scheduleId,
        amount: amount
      },
      success: function() {
        // Redirect the user to the success page
        window.location.href = "/user";
      },
      error: function() {
        alert("Error making purchase.");
      }
    });
  });
});