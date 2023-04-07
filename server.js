const express = require('express')
const app = express()
const port = 8007
//passing static files
var path = require("path");
var staticpath = path.join(__dirname);
app.use(express.static(staticpath));
//module for form handling
var bodyParser = require("body-parser");

//the database
var fs = require("fs");
var file =__dirname + "/" + "database.db";
//check if the file exist in this folder
var exists = fs.existsSync(file);

//check if the file exists
if(!exists){
    fs.openSync(file, "w");
}
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(file);

app.set('view engine', 'ejs');

function generatePosterPath(title) {
  const modifiedTitle = title.replace(/[\/\\:*\?"<>\|]/g, '');
  const posterPath = `/poster/${modifiedTitle}.jpg`;
  return posterPath;
}

app.get('/', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 10;

  db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = rows.map(row => generatePosterPath(row.title));
    res.render('index', { movies: rows, posterPath });
  });
});

app.get('/data', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 10;

  db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = rows.map(row => generatePosterPath(row.title));
    res.json({ movies: rows, posterPath });
  });
});


app.get('/movies/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM movies WHERE id = ?', [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = generatePosterPath(row.title);
    res.render('movie', { movie: row, posterPath });
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// db.serialize(function(){
//     if(!exists){
//         db.run("CREATE TABLE movies(id INTEGER PRIMARY KEY AUTOINCREMENT, title, genre, year, director, rating)")
//         db.run("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT,firstname, lastname, email, username, adress, credit_card )")
//     }

//     var stmt = db.prepare( "INSERT INTO movies VALUES (NULL,?,?,?,?,?)");

//     stmt.run("Shrek", "Animation/Comedy",2001, "Andrew Adamson", "7,9");
//     stmt.finalize();
//     db.each("SELECT * FROM movies", function(err,row){
//     console.log(row);
//     });
//     db.each("SELECT * FROM users", function(err,row){
//       console.log(row);
//       });
      
//   })
// db.close();
// //here we handle the input of the form
// app.use(bodyParser.urlencoded({extended:false}));
// app.post("/processForm", (req,res)=> {
  
//   let firstname = req.body.firstname;
//   let ln = req.body.lastname;
//   let email = req.body.email;
//   let username = req.body.username;
//   let password = req.body.password;
//   let credit_card = req.body.credit_card;
//   //put the user info into the database
//   db.serialize(()=>{
//     var accountstmt = db.prepare("INSERT INTO users VALUES (NULL,?,?,?,?,?,?)");
//     accountstmt.run(firstname,ln,email,username,password,credit_card);
//     accountstmt.finalize();
//     db.each("SELECT * FROM users", function(err,row){
//       console.log(row);
//       });
//   });

//   db.close();
//   //res.json({requestBody: req.body})
//   res.status(200).send( "yuh " + firstname + " " + ln+ " "+ email + " " + username+ " "+password+ " " + credit_card);
// })



// //test page
// app.get('/', (req, res) => {
//   res.send('hey')
// })
// //here we listen to the port
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })