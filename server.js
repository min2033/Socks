var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('public'));

// send back an array of fake randomly generated data.
app.get('/data',function(req,res){
  var stocks = [];
  var names = ['VNET','AKAM','BCOR','BRNW','CCIH','CNV','CXDO','EFLN','EDXC','EPAZ'];

  for (var i = 0; i < 50; i++) {
    var obj = {};
    obj['name'] = names[Math.floor(Math.random(0,names.length)*10)];
    obj['price'] = Math.floor(Math.random(10,250)*100);
    obj['volume'] = Math.floor(Math.random(50,200)*100);
    stocks.push(obj);
  };
  
  res.send(JSON.stringify(stocks));
});


app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});



app.listen(8080,function(err){
  console.log('app listening on... 8080');

});