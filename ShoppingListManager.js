// DBManager.js
// provides high-level interface to shopping lists
// tunneled to https://github.com/projectfaar/shopping-list

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

var net = require("net");

;

var MASTERTOKEN = "CATSONRATS";

module.exports.init = function() {

}

module.exports.getShoppingList = function(name, callback) {
  var client = net.connect({
    port: 1337
  }, function() {
    client.write(MASTERTOKEN+","+name);
  });

  client.on("data", function(d) {
    callback(d.toString());
    client.end();
  })
}

module.exports.close = function() {

}
