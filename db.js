// This file will be used to create the .db-file and all the code are commented out after the operation

const sqlite3 = require("sqlite3").verbose();
let sql;

//connect to DB
const db = new sqlite3.Database("./database.db",sqlite3.OPEN_READWRITE,(err) => {
    if (err) return console.error(err.message);
});

//create movie table
// sql = `CREATE TABLE movies(movie_id INTEGER PRIMARY KEY AUTOINCREMENT, title, genre, year, director, rating)`
//   db.run(sql);

//drop table
//db.run("DROP TABLE movies")


//insert data into table
sql = `INSERT INTO movies(movie_id, title, genre, year, director, rating) VALUES (?,?,?,?,?,?)`
db.run(sql);

db.run(sql, [999, "Shrek", "Animation/Comedy",2001, "Andrew Adamson", "7,9" ],(err) => {
    if (err) return console.error(err.message);
});
