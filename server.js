var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile();
});



app.listen(8080,function(err){
  console.log('app listening on... 8080');

});