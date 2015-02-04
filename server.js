var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var datastore = JSON.parse(fs.readFileSync('datastore.json'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Getting and posting data are currently not used, but here's the functionality.
app.get('/data.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(datastore));
});

app.post('/data.json', function(req, res) {
  datastore.push(req.body);
  fs.writeFile('datastore.json', JSON.stringify(datastore));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(datastore));
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
