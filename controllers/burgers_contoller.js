var express=require("express");

var router=express.Router();

var burger=require("../models/burger.js");

router.get("/",function(req,res){
    burger.all(function(dbData){
        let handlebarsObject={
            burger:dbData
        };
        console.log(handlebarsObject);
        res.render("index",handlebarsObject);
    });
});

router.post("/api/burgers",function(req,res){
    burger.create([
        "name","devoured"
    ],[
      req.body.name,req.body.devoured
    ],function(result){
        res.json({id:result.insertId});
    });
});

router.put("/api/burgers/:id",function(req,res){

    var condition = "id = " + req.params.id;

    console.log("condition", condition);

  burger.update({name: req.body.devoured}, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
module.exports=router;