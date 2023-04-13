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
        $.each(data, function(index, value) {
          timeslots += "<button class='timeslot-button' data-time='" + value.time + "'>" + value.time + "</button>";
        });
        $("#timeslot-list").html(timeslots);
      },
      error: function() {
        alert("Error retrieving timeslots.");
      }
    });
  });

  $(document).on("click", ".timeslot-button", function() {
    var timeslot = $(this).data("time");
    var amount = 1; // default amount is 1
    var popup = "<div><p>You selected the timeslot: " + timeslot + "</p><label for='amount'>Amount:</label><input type='number' id='amount' value='1' min='1' /><button id='purchase-button'>Purchase</button></div>";
    $("body").append(popup);
  });

  $(document).on("click", "#purchase-button", function() {
    var timeslot = $(".timeslot-button.active").data("time");
    var amount = $("#amount").val();
    // TODO: send the purchase request to the server and handle the response
    alert("You purchased " + amount + " ticket(s) for the timeslot " + timeslot);
    $("#popup").remove();
  });
});