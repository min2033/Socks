var express = require('express');
var fs = require('fs');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/',express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// send back an array of REAL generated data.
app.post('/data',function(req,res){

  var url = 'http://query.yahooapis.com/v1/public/yql';
  var startDate = req.body.startDate || '2012-01-01';
  var endDate = req.body.endDate || '2012-01-08';
  console.log(req.body.stocks);
  // split stocks by commas
  var stocks = req.body.stocks.split(",");
  for (var i = 0; i < stocks.length; i++) {
    stocks[i] = '"'+stocks[i]+'"';
  };
  stocks = stocks.join(",");
  console.log(stocks);
    // add doublequote before and after each
    // rejoin them with comma
  // var stocks = '"MSFT","TWTR","GE","CSCO"'
  var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ('+ stocks +') and startDate = "' + startDate + '" and endDate = "' + endDate + '"');
  var fullUrl = url + '/?q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";

  request(fullUrl,function(err,response,body){
    if(err) console.log(err);
    else{
      var data = JSON.parse(body);
      res.send(data.query.results.quote);
    }
  });
});




app.listen(8080,function(err){
  console.log('app listening on... 8080');

});