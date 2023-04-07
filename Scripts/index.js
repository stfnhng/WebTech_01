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
        success: function(data) {  console.log(data);
  if (data.movies.length > 0) {
    let html = '';
    for (let i = 0; i < data.movies.length; i++) {
      html += `
        <div class="movie">
          <a href="/movies/${data.movies[i].id}">
            <img src="${data.posterPath[i]}" alt="${data.movies[i].title}" />
          </a>
        </div>
      `;
    }
    $('#movies').append(html);
    offset += limit;
  } else {
    $('#load-more').hide();
  }
},
        error: function(xhr, status, error) {
          console.error(error);
        }
      });
    });
  });