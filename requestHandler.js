var fs = require("fs");

function start(response){
  console.log("Request handler 'start' was called");
  var content = fs.readFileSync("./views/start.html");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function upload(response){
  console.log("Request handler 'upload' was called");
  var content = fs.readFileSync("./views/upload.html");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

exports.start = start;
exports.upload = upload;