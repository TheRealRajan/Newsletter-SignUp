//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/eb4680fb1b",
    method : "POST",
    headers: {
      "Authorization" : "therealrajan f7b8181c48a57054075d6507bf3401d7-us20"
    },
    body : jsonData
  };

  request(options, function(error, response, body) {
    if(error){
      res.send(__dirname + "/failure.html");
    }
    else if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server running on port 3000.");
});

// API Key
// f7b8181c48a57054075d6507bf3401d7-us20

// List ID
// eb4680fb1b
