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

  // Find the HTML elements that we want to populate with data
const movieTitle = document.getElementById('movieTitle');
const genre = document.getElementById('genre');
const year = document.getElementById('year');
const director = document.getElementById('director');
const writers = document.getElementById('writers');
const actors = document.getElementById('actors');
const plot = document.getElementById('plot');
const trailerLink = document.getElementById('trailerLink');

// Create an instance of the Movie class
const shrekMovie = new Movie(
  'Shrek',
  'Animation/Comedy',
  2001,
  director1,
  [writer1, writer2, writer3],
  [actor1, actor2],
  'https://image-link',
  'https://www.youtube.com/watch?v=W37DlG1i61s',
  "After his swamp is filled with magical creatures, an ogre agrees to rescue a princess for a villainous lord in order to get his land back."
);

// Populate the HTML elements with the movie information
movieTitle.textContent = shrekMovie.title;
genre.textContent = shrekMovie.genre;
year.textContent = shrekMovie.year;
director.innerHTML = `<a href="#" data-tooltip="${shrekMovie.director.moviesDirected.join(', ')}">${shrekMovie.director.name}</a>`;
writers.innerHTML = shrekMovie.writers.map(writer => `<li><a href="#" data-tooltip="${writer.booksWritten.join(', ')}">${writer.name}</a></li>`).join('');
actors.innerHTML = shrekMovie.actors.map(actor => `<li><a href="#" data-tooltip="${actor.moviesStarred.join(', ')}"><img src="${actor.photoLink}" alt="${actor.name}" /></a></li>`).join('');
plot.textContent = shrekMovie.plot;
trailerLink.href = shrekMovie.trailer;

// Get all the links with a data-tooltip attribute
const links = document.querySelectorAll('[data-tooltip]');

// Add mouseover and mouseout event listeners to each link
links.forEach(link => {
  link.addEventListener('mouseover', event => {
    // Get the tooltip element for this link
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = link.getAttribute('data-tooltip');

    // Position the tooltip
    tooltip.style.top = event.clientY + 'px';
    tooltip.style.left = event.clientX + 'px';

    // Add the tooltip to the document
    document.body.appendChild(tooltip);
  });

  link.addEventListener('mouseout', event => {
    // Remove the tooltip element from the document
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });
});

