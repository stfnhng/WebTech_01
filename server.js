const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const port = 8007
//passing static files
var path = require("path");
var staticpath = path.join(__dirname);
app.use(express.static(staticpath));
//module for form handling
var bodyParser = require("body-parser");

function setupdatabse(){
  const fs = require('fs');
  const file = __dirname + '/' + 'database.db';
  //check if the file exists in this folder
  const exists = fs.existsSync(file);

  //check if the file exists
  if (!exists) {
    fs.openSync(file, 'w');
  }
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database(file);

  return db;
};

//order

app.get('/order', function(req, res) {
  // Query the database to get the list of movies
  const db = setupdatabse();
  db.all('SELECT * FROM movies', function(err, result) {
    if (err) throw err;
    // Render the order.ejs view with the movies array as a local variable
    res.render('order', { movies: result });
    db.close();
  });
});


app.get('/getTimeslots', (req, res) => {
  const movieId = req.query.movie_id;
  const sql = 
  `SELECT movies.title, schedule.time, schedule.room, schedule.availability
  FROM movies
  JOIN schedule ON movies.id = schedule.movie_id
  WHERE schedule.movie_id = ? AND schedule.availability > 0;`;

  const db = setupdatabse();
  db.all(sql, [movieId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
      res.json(rows);
  });
  db.close();
});


function generatePosterPath(title) {
  const modifiedTitle = title.replace(/[\/\\:*\?"<>\|]/g, '');
  const posterPath = `/poster/${modifiedTitle}.jpg`;
  return posterPath;
}


app.get('/', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 10;

  const db = setupdatabse();
  db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = rows.map(row => generatePosterPath(row.title));
    res.render('index', { movies: rows, posterPath });
  });
  db.close();
});

app.get('/data', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 10;

  const db = setupdatabse();
  db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = rows.map(row => generatePosterPath(row.title));
    res.json({ movies: rows, posterPath });
  });
  db.close();
});


app.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  const db = setupdatabse();
  db.get('SELECT * FROM movies WHERE id = ?', [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = generatePosterPath(row.title);
    res.render('movie', { movie: row, posterPath });
  });
  db.close();
});




// //here we handle the input of the form
app.get('/register', (req, res) => {
  res.render('register');
});
app.use(bodyParser.urlencoded({extended:false}));
app.post("/register", (req,res)=> {
  
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let address = req.body.address;
  let credit_card = req.body.credit_card;
  //put the user info into the database
  
  const db = setupdatabse();

  db.serialize((err)=>{
    if (err) {
      return console.error(err.message);
    }
    var accountstmt = db.prepare("INSERT INTO users VALUES (NULL,?,?,?,?,?,?,?)");
    accountstmt.run(firstname, lastname, email, username, password, address, credit_card);
    accountstmt.finalize();
    db.each("SELECT * FROM users", function(err,row){
      console.log(row);
    });
    db.close();
});
  res.status(200).send( "yuh " + firstname + " " + lastname+ " "+ email + " " + username+ " "+ address + " "+ password + " " + credit_card);
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});