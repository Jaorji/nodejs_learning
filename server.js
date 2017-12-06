var http = require('http');
var url = require("url");
var fs = require("fs");

function start(route,handle){
  function onRequest(request,response){
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle,pathname,response,request);
    response.writeHead(200,{"Content-Type":"text/plain"});
    var content = route(handle,pathname);
    console.log(content);
    response.write(content);
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
