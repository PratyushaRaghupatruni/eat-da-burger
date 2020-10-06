$(function() {
    $(".devour").on("click", function(event) {
      event.preventDefault();
      var id = $(this).data("id");
       console.log("Data Id : " + id);
      var burgerDevoured = {
        devoured: true
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: burgerDevoured
      }).then(
        function() {
          console.log("changed devoured to : " + id );
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".add-burger").on("submit", function(event) {

      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      let burgerName=$("#burger-name").val().trim();
      console.log("burgerName: "+ burgerName);
       if(burgerName === ""){
           return false;
       }

      var newBurger = {
         name: burgerName,
        devoured: false
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new Burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
  });
  