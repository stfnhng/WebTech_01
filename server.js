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
  const posterPath = `../poster/${modifiedTitle}.jpg`;
  return posterPath;
}
//the index page
app.get('/', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 10;
  var login;
  var signup;

  if (req.session.user && req.cookies.user_sid) {
    login = "user";
    signup="logout";
  } else {
    login = "login";
    signup="signup";
  }
  
  const db = setupdatabase();
  db.all('SELECT * FROM movies LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    const posterPath = rows.map(row => generatePosterPath(row.title));
    res.render('index', { movies: rows, posterPath, login, signup});
    db.close();
  });
  
});

//here we logout the user if the logout button is pressed
app.get("/logout",(req,res)=>{
  if (req.cookies.user_sid && req.session.user) {
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

app.post("/register", (req, res) => {
  const { firstname, lastname, email, username, password, address, credit_card } = req.body;

  // Validation checks
  const errors = {};

  if (!firstname) {
    errors.firstname = "First name is required";
  } else if (firstname.length < 2) {
    errors.firstname = "First name must be at least 2 characters long";
  }

  if (!lastname) {
    errors.lastname = "Last name is required";
  } else if (lastname.length < 2) {
    errors.lastname = "Last name must be at least 2 characters long";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!username) {
    errors.username = "Username is required";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (!address) {
    errors.address = "Address is required";
  }

  if (!credit_card) {
    errors.credit_card = "Credit card number is required";
  } else if (!/^(\d{4}-){3}\d{4}$/.test(credit_card)) {
    errors.credit_card = "Credit card number must be 16 digits long and can contain dashes";
  } else {
    // Format the credit card number
    const formatted_credit_card = credit_card.replace(/-/g, "");
    if (formatted_credit_card.length !== 16) {
      errors.credit_card = "Credit card number is invalid";
    }
  }

  // Put the user info into the database
  const db = setupdatabase();

  db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    if (row) {
      if (row.email === email) {
        errors.email = "Email is already taken";
      }
      if (row.username === username) {
        errors.username = "Username is already taken";
      }

      const errorMessages = Object.values(errors).join(', ');
      return res.status(400).json({ alert: errorMessages });
    }

    // If there are no validation errors and the username and email don't already exist in the database, insert the user's info into the database
    const accountstmt = db.prepare("INSERT INTO users VALUES (NULL,?,?,?,?,?,?,?)");
    accountstmt.run(firstname, lastname, email, username, password, address, credit_card);
    accountstmt.finalize();
    db.each("SELECT * FROM users", function (err, row) {
      console.log(row);
    });
    db.close();

    // Return a success response to the client
    res.redirect('/user')
  });
});

//Login page
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

  // Update the schedule availability in the database
  const db = setupdatabase();
  db.run('UPDATE schedule SET availability = availability - ? WHERE id = ? AND availability >= ?', [amount, scheduleId, amount], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating availability');
      db.close();
      return;
    }

    // Check if any rows were affected by the update
    if (this.changes === 0) {
      res.status(500).send('Insufficient availability');
      db.close();
      return;
    }

    // Insert the purchase into the database
    const stmt = db.prepare('INSERT INTO purchase (schedule_id, user_id, amount) VALUES (?, ?, ?)');
    stmt.run(scheduleId, userId, amount);
    stmt.finalize();
    db.close();

    // Redirect the user to a success page
    res.redirect('/user');
  });
});

//tells on which port the app should listen.
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
