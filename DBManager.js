// DBManager.js
// provides high-level interface to the underlying database
// currently using SQLite3; long-term MySQL or a NoSQL DB might be nice

/*
The MIT License (MIT)

Copyright (c) 2015 projectfaar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


var sqlite3 = require("sqlite3").verbose();
var db = null;
var stmts = {};

module.exports.init = function(filename) {
  db = new sqlite3.Database(filename);
  stmts.getProductByName = db.prepare("SELECT * FROM products WHERE name = ?");
}

module.exports.getProductByName = function(name, callback) {
  stmts.getProductByName.all(name, function(error, rows) {
    if(!error) {
      if(rows.length) {
        callback({
          name: rows[0].name,
          id: rows[0].id,
          aisle: rows[0].aisle,
          aislePosition: rows[0].aislePosition
        });
      } else {
        callback(null);
      }
    } else {
      console.error(error);
    }
  })
}

module.exports.close = function() {
  db.close();
}
