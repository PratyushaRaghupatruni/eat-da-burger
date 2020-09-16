// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = 'SELECT * FROM ??';
    connection.query(queryString,[tableInput] ,function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  create: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ?? (??) VALUES (?)';
    connection.query(queryString,[table,cols,vals], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = 'UPDATE ?? SET ?? = ? WHERE id = ?';

    connection.query(queryString,[table,objColVals,condition] ,function(err, result) {
      if (err)   throw err;
      cb(result);
    });
  },
};
// Export the orm object for the model (.js).
module.exports = orm;
