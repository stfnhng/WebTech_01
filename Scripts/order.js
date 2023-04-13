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
          timeslots += "<li>" + value.time + "</li>";
        });
        $("#timeslot-list").html(timeslots);
      },
      error: function() {
        alert("Error retrieving timeslots.");
      }
    });
  });
});