var dbcon = require("../crowdfunding_db");

var connection = dbcon;

connection.connect();

var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
  connection.query("select fundraiser.*, category.name from fundraiser inner join category on fundraiser.category_id = category.category_id where fundraiser.active = true;", (err, records) => {
      if (err) {
         console.error("Error while retrieve active fundraisers including category");  
      } else {
         res.send(records);
        }
    })
})

router.get('/categories', (req, res) => {
  connection.query("select * from category", (err, records) => {
      if (err) {
          console.error("Error while retrieve categories");
      } else {
          res.send(records);
      }
  })
})

router.get('/search', (req, res) => {
 connection.query("select fundraiser.*, category.name from fundraiser inner join category on fundraiser.category_id = category.category_id where fundraiser.active = true;", (err, records) => {
   if (err) {
      console.error("Error while retrieve the data");
    } else {
      res.json(records);
    }
  })
})

router.get("/:id", (req, res) => {
  connection.query("select fundraiser.*, category.name from fundraiser inner join category on fundraiser.category_id = category.category_id where fundraiser.fundraiser_id=" + req.params.id, (err, records) => {
      if (err) {
        console.error("Error while retrieve details of a fundraiser by ID");
      } else {
        res.send(records);
      }
  })
})