var express=require("express");

var router=express.Router();

var burger=require("../models/burger");
console.log(burger);

const convertToString = str => str == "true";
console.log(convertToString);

router.get("/",function(req,res){
    burger.all(function(data){
        var handlebarsObject={burgers:data};
        console.log(handlebarsObject);
        res.render("index",handlebarsObject);
    });
});

router.post("/api/burgers",function(req,res){
  console.log("name : "+req.body.name+" Devoured : "+req.body.devoured);
  let devoured = convertToString(req.body.devoured);
    console.log(devoured);
    // Insert burger into db
    burger.create(
        ["burger_name","devoured"],
        [req.body.name, devoured],
        function(result){
          console.log(result);
            res.json({ id : result.id });
        });
});

router.put("/api/burgers/:id",function(req,res){

  let condition = "id = "+req.params.id;

  // Convert boolean to string
  let devoured = convertToString(req.body.devoured);

  // Update burger as devoured in db
  burger.update({ devoured:devoured } ,condition, function(result){
      
      if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
  });

});

// Export routes for server.js to use.
module.exports = router;
