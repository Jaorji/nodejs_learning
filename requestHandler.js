var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");

function start(response){
  console.log("Request handler 'start' was called");
  var content = fs.readFileSync("./views/start.html");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function upload(response,request){
  console.log("Request handler 'upload' was called");
  var form = new formidable.IncomingForm();
  form.parse(request,function(error,fields,files){
    fs.renameSync(files.upload.path,"/tmp/test.png");//upload image path from local and change the path to server path
    //fs.renameSync(path1,path2) run sync so may cause block.
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("recevied image:<br/>");
    response.write("<image src='/show'/>");
    response.end();
  });
    
}

function show(response){
  fs.readFile("/tmp/test.png","binary",function(error,file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error+"\n");
      response.end();
    }else{
      response.writeHead(200,{"Content-Type":"image/png"});
      response.write(file,"binary");
      response.end();
    }
  })
}

exports.start = start;
exports.upload = upload;
exports.show = show;