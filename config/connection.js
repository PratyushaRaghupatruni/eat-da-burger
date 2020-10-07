// Set up MySQL connection.
var mysql = require("mysql");
if(process.env.JAWSDB_URL){
  connection=mysql.createConnection(process.env.JAWSDB_URL);
}
else{
var connection = mysql.createConnection({
  host: "c584md9egjnm02sk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "b47rjmplcvm9daj6",
  password: "rnpz07qqct0n0b7l",
  database: "brb188kdi8wzdxqm"
});
};

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;