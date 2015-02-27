// rest.js
// RESTful node.js webserver for FAAR backend access
// usage: node rest.js [config]
// config is an optional configuration file path,
// assumed to be located in config.json

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

var http = require('http');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync(process.argv[2] || "./config.json").toString());

// endpointCallback provides callbacks based on a specific endpoint
// function callback(req, res)
var endpointCallback = {};

// urlendpoints is populated with potential values for req.url
config.urlendpoints = [];
config.endpoints.map(function(e) {
  config.urlendpoints.push(config.bareEndpoint + e);
  endpointCallback[e] = require("./endpoints/"+e);
});

http.createServer(function(req, res) {
  var url = req.url;
  var endpoint = url.split("?")[0];

  if(config.urlendpoints.indexOf(endpoint) > -1) { // is a valid endpoint?
    endpoint = endpoint.slice(config.bareEndpoint.length); // remove the base URL for the endpoint name

    if(endpointCallback[endpoint]) {
      endpointCallback[endpoint](req, res);
    } else {
      console.log("Known API endpoint with no handlers for URL "+url);
    }
  } else {
    console.log("Unknown API endpoint "+url);
  }
}).listen(config.port);
