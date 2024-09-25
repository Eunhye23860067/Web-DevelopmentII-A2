var dbcon = require("../crowdfunding_db");

var connection = dbcon;

connection.connect();

var express = require('express');

var router = express.Router();

router.get('/fundraisers', (req, res) => {
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

//search params
router.get('/search/:multisearch', (req, res) => {
  let values = req.params.multisearch.split("*");
  let city = values[0];
  let organizer = values[1];
  let category = values[2];
  console.log("select fundraiser.*, category.name from fundraiser inner join category on fundraiser.category_id = category.category_id where fundraiser.active = true and fundraiser.city like '%" + city + "%' and fundraiser.organizer like '%" + organizer + "%' and category.name like '%" + category + "%'");
  connection.query("select fundraiser.*, category.name from fundraiser inner join category on fundraiser.category_id = category.category_id where fundraiser.active = true and fundraiser.city like '%" + city + "%' and fundraiser.organizer like '%" + organizer + "%' and category.name like '%" + category + "%'",
   (err, records) => {
   if (err) {
      console.error("Error while retrieve the data");
    } else {
      res.json(records);
    }
  })
})


router.get("/fundraisers/:id", (req, res) => {
  console.log("select fundraiser.*, category.name from fundraiser inner join category on fundraiser.category_id = category.category_id where fundraiser.fundraiser_id = ${req.params.id}");
  connection.query("select fundraiser.*, category.name from fundraiser inner join category on fundraiser.category_id = category.category_id where fundraiser.fundraiser_id = ?", [req.params.id], (err, records, fields) => {
  if (err) {
        console.error("Error while retrieve fundraiser by ID");
      } else {
        res.json(records); 
      }
    });
  });

module.exports = router;