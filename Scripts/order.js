$(document).ready(function() {
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