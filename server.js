const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const port = 8007;
var cookieParser = require("cookie-parser");
var session = require("express-session");
//passing static files
var path = require("path");
var staticpath = path.join(__dirname);
app.use(express.static(staticpath));
//module for form handling
var bodyParser = require("body-parser");
const { Console } = require('console');

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
      expires: false,
    },
  })
);
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect("/login");
  }
};

//setsup the databse so that we can open it multiple times
function setupdatabase(){
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

app.set('view engine', 'ejs');
//method that generates a path for the image of the poster 
function generatePosterPath(title) {
  const modifiedTitle = title.replace(/[\/\\:*\?"<>\|]/g, '');
  const posterPath = `./poster/${modifiedTitle}.jpg`;
  return posterPath;
}
//the index page
app.get('/', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 10;
  var login;
  
  const db = setupdatabase();
  db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }else{
      db.get("SELECT username FROM users WHERE id=?",[req.session.user],(err,username)=>{
        const posterPath = rows.map(row => generatePosterPath(row.title));
        if (req.session.user && req.cookies.user_sid) {
          login =username.username;
        } else {
          login = "Sign In";
        }
        res.render('index', { movies: rows, posterPath, login});
        db.close();
      })

    }
    
  });
  
});

//here we logout the user if the logout button is pressed
app.get("/logout",(req,res)=>{
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  res.redirect("/");
})

//display the users info on the userpage
app.get("/user", (req, res) => {
  const db = setupdatabase();

  // Check if the user is logged in
  if (req.session.user) {
    const userId = req.session.user;

    // Fetch the user data
    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
      if (err) {
        console.error(err.message);
        res.redirect("/");
      } else {
        // Fetch all orders for the user
        db.all(
          `SELECT purchase.*, movies.title, schedule.time, schedule.room
           FROM purchase
           INNER JOIN schedule ON purchase.schedule_id = schedule.id
           INNER JOIN movies ON schedule.movie_id = movies.id
           WHERE purchase.user_id = ?
           ORDER BY purchase.id DESC`,
          [userId],
          (err, orders) => {
            if (err) {
              console.error(err.message);
              res.redirect("/");
            } else {
              console.log(user, orders);
              res.render("user", { user, orders });
            }
            db.close();
          }
        );
      }
    });
  } else {
    res.redirect("/login");
  }
});

app.get('/data', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 10;

  const db = setupdatabase();
  db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = rows.map(row => generatePosterPath(row.title));
    res.json({ movies: rows, posterPath });
    db.close();
  });
  
});


app.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  const db = setupdatabase();
  db.get('SELECT * FROM movies WHERE id = ?', [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = generatePosterPath(row.title);
    res.render('movie', { movie: row, posterPath });
    db.close();
  });
  
});

//the registerpage
//here we handle the input of the form
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
  const db = setupdatabase();

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

  //used to see what is in the body, needs to be removed
  //res.json({requestBody: req.body})
  
  //used to see what is in the body and display it on the page
  res.status(200).send( "yuh " + firstname + " " + lastname+ " "+ email + " " + username+ " "+ address + " "+ password + " " + credit_card);
})


app.get('/login', (req, res) => {
  res.render('login');
});
app.post("/user",(req,res)=>{
  let usn = req.body.usn;
  let pwd = req.body.pwd;

  let db = setupdatabase();
  
  db.serialize((err)=>{
    if (err){
      return console.error(err.message);
    }
    
  });
  db.get('SELECT * FROM USERS WHERE username=? AND password=?' ,[usn,pwd],(err, row)=>{
      if (err) {
        return console.error(err.message);
      }
      if(row != null){
      req.session.user = row.id;
      console.log(req.session.user);
      res.redirect('/');
      }
      else{
        // hier moeten we als dit in .ejs zit , de huidige pagina displayen met een error
        res.send("login failed");
      }
    })
  
})
//order

app.get('/order',sessionChecker, function(req, res) {
  // Query the database to get the list of movies
  const db = setupdatabase();
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
  `SELECT movies.title, schedule.id, schedule.time, schedule.room, schedule.availability
  FROM movies
  JOIN schedule ON movies.id = schedule.movie_id
  WHERE schedule.movie_id = ? AND schedule.availability > 0;`;

  const db = setupdatabase();
  db.all(sql, [movieId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
      res.json(rows);
  });
  db.close();
});

app.post('/purchase', sessionChecker, (req, res) => {
  const scheduleId = req.body.scheduleId;
  const amount = req.body.amount;
  const userId = req.session.user;
  console.log(scheduleId, amount, userId);
  //Insert the purchase into the database
  const db = setupdatabase();
  const stmt = db.prepare('INSERT INTO purchase (schedule_id, user_id, amount) VALUES (?, ?, ?)');
  stmt.run(scheduleId , userId, amount);
  stmt.finalize();
  db.close();

  // Redirect the user to a success page
  res.redirect('/user');
});

//tells on which port the app should listen.
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
