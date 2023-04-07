$(document).ready(function() {
  // initialize offset and limit
  let offset = 10;
  const limit = 10;

  // add click event listener to Load More button
  $('#load-more').click(function() {
    // send an AJAX request to the server to get the next set of movies
    $.ajax({
      url: `/data?offset=${offset}&limit=${limit}`,
      method: 'GET',
      success: function(data) {  
        console.log(data);
      
        if (data.movies.length > 0) {
          // create an empty array to store the HTML for the new posters
          const newPosters = [];
      
          // iterate over the movies array in the data object
          for (let i = 0; i < data.movies.length; i++) {
            // generate the poster path for the movie
            const posterPath = data.posterPath[i];
            // create the HTML for the new poster
            const newPosterHTML = `
              <div class="movie">
                <a href="/movies/${data.movies[i].id}">
                  <img src="${posterPath}" alt="${data.movies[i].title}" />
                </a>
              </div>
            `;
            // add the new poster HTML to the newPosters array
            newPosters.push(newPosterHTML);
          }
      
          // append the new posters to the wrapper element
          $('.wrapper').append(newPosters.join(''));
          
          // update the offset for the next AJAX request
          offset += limit;
        }
        else {
          $('#load-more').hide();
        }
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });
});
