const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//static files
app.use(express.static(__dirname));

//serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});


app.listen(8080,() => {
    console.log("Server running 8080");
});