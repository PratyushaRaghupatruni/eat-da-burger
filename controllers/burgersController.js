var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger=require("../models/burger.js");
router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burger : data
      };
    
     res.render("index", hbsObject);
    });
  });

  router.post("/api/burgers", function(req, res) {

    if(req.body.devoured==="false"){
      req.body.devoured=0;
    }
    else if(req.body.devoured==="true"){
      req.body.devoured=1;
    }

    burger.create([ "burger_name",        "devoured"], [
                     req.body.name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
      console.log(result);
      res.json({ id: result.id });
    });
  });

  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    if(req.body.devoured==="false"){
      req.body.devoured=0;
    }
   
    console.log("condition : " + condition);

    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  module.exports = router;
  