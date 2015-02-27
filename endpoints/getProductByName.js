// endpoints/getProductByName.js
// endpoint for returning a product given a name search query
// parameters: String name
// return: Product product

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

var querystring = require("querystring");

module.exports = function(req, res) {
  var parameters = querystring.decode(req.url.split("?")[1]);

  if(!!parameters.name) {
    // dummy product for now
    // we'll integrate with the DB soon
    var product = {
      name: parameters.name,
      id: 1234
    };

    res.end(JSON.stringify({
      status: 0,
      product: product
    }));
  } else {
    console.log("Missing parameter(s) in URL "+req.url);
    res.end(JSON.stringify({
      status: -1,
      errorMessage: "Missing parameters"
    }));
  }
}
