
// Create a class for Artist
class Artist {
    constructor(name, yearOfBirth) {
      this.name = name;
      this.yearOfBirth = yearOfBirth;
    }
    addTooltip(element, text) {
      // Add mouseover event listener to show tooltip
      element.addEventListener('mouseover', () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = text.replace(/\n/g, '<br>');
        element.appendChild(tooltip);
      });
    
      // Add mouseout event listener to hide tooltip
      element.addEventListener('mouseout', () => {
        const tooltip = element.querySelector('.tooltip');
        element.removeChild(tooltip);
      });
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
  constructor(title, genre, year, director, writers, actors, plot, poster) {
    this.title = title;
    this.genre = genre;
    this.year = year;
    this.director = director;
    this.writers = writers;
    this.actors = actors;
    this.plot = plot;
    this.poster = poster;
  }
  // Generate the HTML for the movie details
  generateHTML() {
    const movieTitle = document.createElement('h1');
    movieTitle.id = 'movieTitle';
    movieTitle.textContent = this.title;

    const genre = document.createElement('p');
    genre.id = 'genre';
    genre.textContent = this.genre;

    const year = document.createElement('p');
    year.id = 'year';
    year.textContent = this.year;

    const posterImg = document.createElement('img');
    posterImg.id  = 'poster';
    posterImg.src = '../images/shrek-film-thumbnail.jpg';
    posterImg.alt = `${this.title} poster`;
    posterImg.classList.add('poster');
  // Generate the director section
    const director = document.createElement('span');
  director.id = 'director';
  director.textContent = `${this.director.name}`;
  this.director.addTooltip(director, `Born: ${this.director.yearOfBirth}\nDirected: ${this.director.moviesDirected.join(', ')}`);
  // Generate the writer section
  const writers = document.createElement('ul');
  writers.id = 'writers';
  for (let writer of this.writers) {
    const writerList = document.createElement ('li');
    const writerItem = document.createElement('span');
    writerList.appendChild(writerItem);
    writerItem.textContent = writer.name;
    writer.addTooltip(writerItem, `Born: ${writer.yearOfBirth}\nWritten: ${writer.booksWritten.join(', ')}`);
    writers.appendChild(writerList);
  }
  // Generate the actor section
  const actors = document.createElement('ul');
  actors.id = 'actors';
  for (let actor of this.actors) {
    const actorList = document.createElement('li');
    const actorItem = document.createElement('span');
    actorList.appendChild(actorItem);
    const actorPhoto = document.createElement('img');
    actorPhoto.src = actor.photoLink;
    actorPhoto.alt = actor.name;
    actorPhoto.classList.add('actor-photo');
  
    const actorName = document.createElement('span');
    actorName.textContent = actor.name;
    actorName.classList.add('actor-name');
    
    actorItem.appendChild(actorPhoto);
    actorItem.appendChild(actorName);
    actor.addTooltip(actorItem, `Born: ${actor.yearOfBirth}\nStarred: ${actor.moviesStarred.join(', ')}`);
  
    actors.appendChild(actorList);
  }
// Generate the plot section
    const plot = document.createElement('p');
    plot.id = 'plot';
    plot.textContent = this.plot;

    const trailerLink = document.createElement('a');
    trailerLink.id = 'trailerLink';
    trailerLink.href = 'https://www.youtube.com/watch?v=CwXOrWvPBPk';
    trailerLink.textContent = 'Watch trailer';

    document.body.setAttribute("id", "body");

    const header = document.createElement('header');
    header.setAttribute("id", "header")

    const section1 = document.createElement('section');
    section1.innerHTML = '<h2>Genre:</h2>';
    section1.setAttribute("id", "genreSection");
    
    const section2 = document.createElement('section');
    section2.innerHTML = '<h2>Year:</h2>';
    section2.setAttribute("id", "yearSection");

    const section3 = document.createElement('section');
    section3.innerHTML = '<h2>Director:</h2>';
    section3.setAttribute("id", "directorSection");
    

    const section4 = document.createElement('section');
    section4.innerHTML = '<h2>Writers:</h2>';
    section4.setAttribute("id", "writersSection");

    const section5 = document.createElement('section');
    section5.innerHTML = '<h2>Actors:</h2>';
    section5.setAttribute("id", "actorsSection");
    section5.classList.add('actors-section');

    const section6 = document.createElement('section');
    section6.innerHTML = '<h2>Plot:</h2>';
    section6.setAttribute("id", "plotSection");
     
    const main = document.getElementsByTagName('main')[0];
// append all items to main
    header.appendChild(movieTitle);
    section1.appendChild(genre);
    section2.appendChild(year);
    section3.appendChild(director);
    section4.appendChild(writers);
    section5.appendChild(actors);
    section6.appendChild(plot);
    main.appendChild(header);
    main.appendChild(section1);
    main.appendChild(section2);
    main.appendChild(section3);
    main.appendChild(section4);
    main.appendChild(section5);
    main.appendChild(section6);
    main.appendChild(posterImg);
    main.appendChild(trailerLink);
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
    "../images/Mike-Myers.jpg"
  );
  const actor2 = new Actor(
    "Eddie Murphy",
    1961,
    ["Shrek", "Beverly Hills Cop", "Norbit"],
    "../images/Eddie-Murphy.jpg"
  );
  const actor3 = new Actor(
    "Cameron Diaz",
    1972,
    ["Shrek", "There's Something About Mary", "The Mask"],
    "../images/Cameron-Diaz.jpg"
  );

  const actor4 = new Actor(
    "John Lithgow",
    1945,
    ["Shrek", "Love is Strange", "Beatriz at dinner"],
    "../images/John-Lithgow.jpg"
  );

  const shrek = new Movie(
    "Shrek",
    "Animation/Comedy",
    2001,
    director1,
    [writer1, writer2, writer3],
    [actor1, actor2, actor3, actor4],
    "An ogre, in order to regain his swamp, travels along with an annoying donkey in order to bring a princess to a scheming lord, wishing himself King."
  );

  shrek.generateHTML();