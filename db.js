var fs = require("fs");
var file =__dirname + "/" + "database.db";
//check if the file exist in this folder
var exists = fs.existsSync(file);

//check if the file exists
if(!exists){
    fs.openSync(file, "w")
    console.log("does not exist")
}

const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
let sql;

db.serialize(function(){
    if(!exists){
        db.run("CREATE TABLE movies(id INTEGER PRIMARY KEY AUTOINCREMENT, title, genre, year, director, rating)")
        db.run("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT,firstname, lastname, email, username, adress, credit_card )")
    }
})

// var stmt = db.prepare( "INSERT INTO movies VALUES (NULL,?,?,?,?,?)");
// stmt.run("Shrek", "Animation/Comedy",2001, "Andrew Adamson", "7,9");
// stmt.finalize();
db.each("SELECT * FROM movies", function(err,row){
console.log(row);
})
db.close();

// This file will be used to create the .db-file and all the code are commented out after the operation


//connect to DB
// const db = new sqlite3.Database("./database.db",sqlite3.OPEN_READWRITE,(err) => {
//     if (err) return console.error(err.message);
// });

//create movie table
// sql = `CREATE TABLE movies(movie_id INTEGER PRIMARY KEY AUTOINCREMENT, title, genre, year, director, rating)`;
// db.run(sql);

//drop table
//db.run("DROP TABLE movies")


//insert data into table
// sql = `INSERT INTO movies(movie_id, title, genre, year, director, rating) VALUES (?,?,?,?,?,?)`
// db.run(sql);

// db.run(sql, [ "Shrek", "Animation/Comedy",2001, "Andrew Adamson", "7,9" ],(err) => {
//     if (err) return console.error(err.message);
// }

// sql = `SELECT * FROM movies`;
// db.all(sql,[],(err,rows)=>{
//     if(err)return console.error(err.message);
//     rows.forEach(row=>{
//         console.log(row)
//     })
// })