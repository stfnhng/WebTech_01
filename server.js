const express = require('express')
const app = express()
const port = 8007
//passing static files
var path = require("path");
var staticpath = path.join(__dirname);
app.use(express.static(staticpath));
//module for form handling
var bodyParser = require("body-parser");

app.get('/', (req, res) => {
  res.send('hey')
})

//here we handle the input of the form
app.use(bodyParser.urlencoded({extended:false}));
app.post("/processForm", (req,res)=> {
  let firstname = req.body.firstname;
  let ln = req.body.lastname;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let credit_card = req.body.credit_card;
  //res.json({requestBody: req.body})
  res.status(200).send( "yuh " + firstname + " " + ln+ " "+ email + " " + username+ " "+password+ " " + credit_card);
})


//here we listen to the port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
