'use strict';
const PORT = 3000;
const contactsFileName = './contacts.json';

var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/', function(req, res) {
  res.send(req)
});

app.get('/contacts', function(req, res) {

  fs.readFile(contactsFileName, function(err, data) {
    var contactsJSON = JSON.parse(data);
    res.send(contactsJSON);
  })

});

app.post('/contacts', function(req,res) {
  var newContact = req.body;

  fs.readFile(contactsFileName, function(err, data) {
    var newContactsArray = JSON.parse(data);
    newContactsArray.push(newContact);

    fs.writeFile(contactsFileName, JSON.stringify(newContactsArray), function(err) {
      console.log('errrrrrrroooooorrrrrr');
      res.send('in the database');
    });
  })
});

var server = http.createServer(app);
server.listen(PORT, function() {
  console.log(`server listening on port: ${PORT}`);
});
