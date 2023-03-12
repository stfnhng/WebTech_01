class Artist {
    constructor(name, yearOfBirth) {
      this.name = name;
      this.yearOfBirth = yearOfBirth;
    }
  }
  
  // Create a class for Director that extends Artist
  class Director extends Artist {
    constructor(name, yearOfBirth, moviesDirected) {
      super(name, yearOfBirth);
      this.moviesDirected = moviesDirected;
    }
  }
  
  // Create a class for Writer that extends Artist
  class Writer extends Artist {
    constructor(name, yearOfBirth, booksWritten) {
      super(name, yearOfBirth);
      this.booksWritten = booksWritten;
    }
  }
  
  // Create a class for Actor that extends Artist
  class Actor extends Artist {
    constructor(name, yearOfBirth, moviesStarred, photoLink) {
      super(name, yearOfBirth);
      this.moviesStarred = moviesStarred;
      this.photoLink = photoLink;
    }
  }
  
  // Create a class for Movie
  class Movie {
    constructor(title, genre, year, director, writers, actors, poster, trailer, plot) {
      this.title = title;
      this.genre = genre;
      this.year = year;
      this.director = director;
      this.writers = writers;
      this.actors = actors;
      this.poster = poster;
      this.trailer = trailer;
      this.plot = plot;
    }
  }
  
  // Create instances of the classes
  const director1 = new Director("Andrew Adamson", 1966, [
    "Shrek",
    "Shrek 2",
  ]);
  const writer1 = new Writer("William Steig", 1907, [
    "Shrek",
    "Shrek 2",
    "Shrek the third",
  ]);
  const writer2 = new Writer("Ted Elliott", 1961, [
    "Shrek",
    "Pirates of the Caribbean: The Curse of the Black Pearl",
    "The Lone Ranger",
  ]);
  const writer3 = new Writer("Terry Rossio", 1960, [
    "Shrek",
    "Alladin",
    "Pirates of the Caribbean: The Curse of the Black Pearl",
  ]);
  const actor1 = new Actor(
    "Mike Myers",
    1963,
    ["Shrek", "Austin Powers", "Amsterdam"],
    "https://image-link"
  );
  const actor2 = new Actor(
    "Eddie Murphy",
    1961,
    ["Shrek", "Beverly Hills Cop", "Norbit"],
    "https://image-link"
  );
  const movie1 = new Movie(
    "Shrek",
    "Animation, Adventure, Comedy",
    2001,
    director1,
    [writer1, writer2, writer3],
    [actor1, actor2],
    "https://poster-link",
    "https://trailer-link",
    "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back."
  );

  function createHeading(title) {
    const heading = document.createElement("h1");
    heading.textContent = title;
    return heading;
  }

  function createArtistList(title, artists) {
    const artistList = document.createElement("ul");
    const artistTitle = document.createElement("h2");
    artistTitle.textContent = title;
    artistList.appendChild(artistTitle);
    
    artists.forEach(artist => {
      const artistItem = document.createElement("li");
      const artistName = document.createElement("p");
      artistName.textContent = artist.name;
      const artistDetails = document.createElement("p");
      artistDetails.textContent = `Born in ${artist.yearOfBirth}`;
      
      if (artist.moviesDirected) {
        const moviesDirected = document.createElement("p");
        moviesDirected.textContent = `Movies directed: ${artist.moviesDirected.join(", ")}`;
        artistDetails.appendChild(moviesDirected);
      } 
      
      if (artist.booksWritten) {
        const booksWritten = document.createElement("p");
        booksWritten.textContent = `Books written: ${artist.booksWritten.join(", ")}`;
        artistDetails.appendChild(booksWritten);
      }
      
      artistItem.appendChild(artistName);
      artistItem.appendChild(artistDetails);
      artistList.appendChild(artistItem);
    });
    
    return artistList;
  }

  // Create a function to create the movie details section
function createMovieDetails(movie) {
    const genre = document.createElement("p");
    genre.textContent = movie.genre;
    
    const year = document.createElement("p");
    year.textContent = movie.year;
    
    const director = createArtistList("Director", [movie.director]);
    
    const writers = createArtistList("Writers", movie.writers);
    
    const actors = createArtistList("Actors", movie.actors);
    
    const plot = document.createElement("p");
    plot.textContent = movie.plot;
    
    const movieDetailsSection = document.createElement("section");
    movieDetailsSection.appendChild(createHeading("Movie Details"));
    movieDetailsSection.appendChild(genre);
    movieDetailsSection.appendChild(year);
    movieDetailsSection.appendChild(director);
    movieDetailsSection.appendChild(writers);
    movieDetailsSection.appendChild(actors);
    movieDetailsSection.appendChild(plot);
    
    return movieDetailsSection;
    }
    
    // Create a function to create the poster section
    function createPosterSection(movie) {
    const posterImage = document.createElement("img");
    posterImage.src = movie.poster;
    
    const posterSection = document.createElement("section");
    posterSection.appendChild(posterImage);
    
    return posterSection;
    }
    
    // Create a function to create the trailer section
    function createTrailerSection(trailerLink) {
    const trailerAnchor = document.createElement("a");
    trailerAnchor.href = trailerLink;
    trailerAnchor.textContent = "Watch trailer";
    
    const trailerSection = document.createElement("footer");
    trailerSection.appendChild(trailerAnchor);
    
    return trailerSection;
    }
    
    // Create a function to display the movie details on the page
    function displayMovieDetails(movie) {
    const movieTitle = document.getElementById("movieTitle");
    movieTitle.textContent = movie.title;
    
    const genre = document.getElementById("genre");
    genre.textContent = movie.genre;
    
    const year = document.getElementById("year");
    year.textContent = movie.year;
    
    const director = document.getElementById("director");
    director.textContent = movie.director.name;
    
    const writers = document.getElementById("writers");
    movie.writers.forEach((writer) => {
    const writerItem = document.createElement("li");
    writerItem.textContent = writer.name;
    writers.appendChild(writerItem);
    });
    
    const actors = document.getElementById("actors");
    movie.actors.forEach((actor) => {
    const actorItem = document.createElement("li");
    actorItem.textContent = actor.name;
    actors.appendChild(actorItem);
    });
    
    const plot = document.getElementById("plot");
    plot.textContent = movie.plot;
    
    const trailerLink = document.getElementById("trailerLink");
    trailerLink.href = movie.trailer;
    }
    
    // Call the functions to display the movie details on the page
    const movie = movie1;
    const movieDetails = createMovieDetails(movie);
    const posterSection = createPosterSection(movie);
    const trailerSection = createTrailerSection(movie.trailer);
    
    const main = document.querySelector("main");
    main.appendChild(posterSection);
    main.appendChild(movieDetails);
    main.appendChild(trailerSection);
    
    displayMovieDetails(movie);