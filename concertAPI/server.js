var express = require('express');  
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

const crowdfundingRoutes = require('./controllerAPI/crowdfundingApi/api-controller');
const adminRoutes = require('./controllerAPI/adminApi/api-controller');

app.use('/api/crowdfunding', crowdfundingRoutes);
app.use('/api/admin', adminRoutes);

app.use(cors({origin: `http://localhost:8080`}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', express.static('C:/Users/qpdj0/databaseMysql/adminWebApp'));


app.listen(3000);
console.log("Server up and running on port 3000");
