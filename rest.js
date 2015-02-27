var http = require('http');

var config = {
  port: 8080,
  bareEndpoint: "/api/",
  endpoints: ["getProductByName"]
}

config.urlendpoints = [];
config.endpoints.map(function(e) {
  config.urlendpoints.push(config.bareEndpoint + e);
});

console.log(config);

http.createServer(function(req, res) {
  var url = req.url;
  var endpoint = url.split("?")[0];

  if(config.urlendpoints.indexOf(endpoint) > -1) {
    endpoint = endpoint.slice(config.bareEndpoint.length);
    console.log("Found endpoint "+endpoint);
  } else {
    console.log("Unknown API endpoint "+url);
  }
}).listen(config.port);
