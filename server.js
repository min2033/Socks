var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile();
});

// send back an array of fake randomly generated data.
app.get('/data',function(req,res){
  var data = [];
  for (var i = 0; i < 100; i++) {
    data.push({i:Math.floor(Math.random(10,250)*100)});
  };
  res.send(JSON.stringify(data));
});



app.listen(8080,function(err){
  console.log('app listening on... 8080');

});