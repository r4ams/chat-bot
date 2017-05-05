var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var token = "EAAKnjNqiiSYBACGAD8pOalOOM8QSosY4xI2yBVT0lUkHRZBHcLbiMLUB6kUiCx5uyBMHmV6NAUKfhkw0T00JpDbg9FVZBiV6VTDhDJdxwkSCZCZBDKtfL3cXzP3XsCsqyhk2AA5kNtj64iZCJugg5k9hQ4zr6TL3qZB97vEszLYgZDZD";
var verify_token = "512248325967as";


//Root EndPoint
app.get('/', function (req, res) {
  res.send('Facebook Messenger Bot root endpoint!');
});

//Setup Webhook
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === verify_token) {
    res.send(req.query['hub.challenge']);
  }
 res.send('Error, wrong validation token');
});

//App listen
app.listen(port, function () {
  console.log('Facebook Messenger Bot on port: ' + port);
});