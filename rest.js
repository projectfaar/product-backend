// rest.js
// RESTful node.js webserver for FAAR backend access
// Copyright (C) 2015 Project FAAR

/*
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

var http = require('http');

var config = {
  port: 8080,
  bareEndpoint: "/api/",
  endpoints: ["getProductByName"]
};

// urlendpoints is populated with potential values for req.url
config.urlendpoints = [];
config.endpoints.map(function(e) {
  config.urlendpoints.push(config.bareEndpoint + e);
});

http.createServer(function(req, res) {
  var url = req.url;
  var endpoint = url.split("?")[0];

  if(config.urlendpoints.indexOf(endpoint) > -1) { // is a valid endpoint?
    endpoint = endpoint.slice(config.bareEndpoint.length); // remove the base URL for the endpoint name
    console.log("Found endpoint "+endpoint);
  } else {
    console.log("Unknown API endpoint "+url);
  }
}).listen(config.port);
