$(document).ready(function() {
  // Initialize the movie list
  var movieList = $("#movie-select option");

  // Search for a movie
  $("#movie-search").on("input", function() {
    var value = $(this).val().toLowerCase();

    // Filter the movie list by name
    movieList.filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

    // Show the "Select a movie" option if no results are found
    if ($("#movie-select option:visible").length === 1) {
      $("#movie-select").val("0");
    }
  });

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
          // compare the current date and time with the timeslot time to ensure only timeslots in the future will be shown
          if (time > now) {
            timeslots += "<button class='timeslot-button' data-time='" + value.time + "' data-movie-id='" + value.movie_id + "'>" + value.time + "</button>";
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
    var movieId = $(this).data("movie-id");
    var amount = 1; // default amount is 1

    // Close the current popup if there is one
    if (currentPopup) {
      currentPopup.remove();
    }

    // Get the movie title
    var movieTitle = $("#movie-select option:selected").text();

    // Create a new popup
    var popup = $("<div id='popup'><p>You selected the timeslot: " + timeslot + " for the movie: " + movieTitle + "</p><label for='amount'>Amount:</label><input type='number' id='amount' value='1' min='1' /><button id='purchase-button'>Purchase</button><button id='cancel-button'>Cancel</button></div>");

    // Add a cancel button to the popup
    popup.find("#cancel-button").click(function() {
      popup.remove();
      currentPopup = null;
    });

    $("body").append(popup);
    currentPopup = popup;
  });
});