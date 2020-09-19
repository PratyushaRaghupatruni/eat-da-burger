// Import MySQL connection.
var connection = require("./connection.js");
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}
var orm = {
  all: function(tableInput, cb) {
    var queryString =  `SELECT * FROM ${tableInput};`;
    connection.query(queryString,function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
 
  create: function(table, cols, vals, cb) {
    var queryString = `INSERT INTO ${table}(${cols.toString()}) VALUES(${printQuestionMarks(vals.length)});`;
    connection.query(queryString, vals, function (err, result) {
        if (err) {
            throw err;
        }
        cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function (table, objColVals, condition, cb) {
    var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`;
    connection.query(queryString, function (err, result) {
        if (err) {
            throw err
        };
        cb(result);
    });
}
};
// Export the orm object for the model (.js).
module.exports = orm;
