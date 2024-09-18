var express = require('express');  
var bodyParser = require('body-parser');
var concertAPI = require('./controllerAPI/api-controller'); 
const cors = require('cors');

var app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/concerts', concertAPI);


app.listen(3060);

console.log("running on port 3060");
