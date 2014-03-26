var express = require('express');
var request = require('request');

var app = express.createServer();
app.use(express.logger())


function gistUrl(){
  var url = "https://api.github.com/gists";
  if(process.env['CLIENT_ID']){
    url = url + "?client_id=" +
      process.env['CLIENT_ID'] + "&client_secret" +
      process.env['CLIENT_SECRET'];
  }
  return url;
}

function createGist(content, fileName, callback) {
  var json = {
    "description": "Cist created gist",
    "public": false,
    "files": {
    }
  };
  var headers = {
    "User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)"
  }
  json['files'][fileName] = {
    "content": content
  };
  console.log(content);
  request.post(gistUrl(), {json:json, headers:headers}, function(err, res, body){
    callback(err, res, body);
  });
}

function saveFile(request, response) {
  console.log(request.url)
  var fileName = request.url.match(/\/(.*)$/)[1]

  request.setEncoding('utf-8')
  var content = ''
  request.on('data',function(chunk){
    content = content + chunk;
  });
  request.on('end',function(){
    createGist(content, fileName, function(err, resp, body){
      if (err) {
        response.send("Got an error trying to connect with Github, sorry.\n");
      } else if (resp.statusCode != 200) {
        response.send("Error: " + resp.statusCode + " - " + body + "\n");
      } else {
        console.log(body);
        response.send(body['html_url'] + "\n");
      }
    });
  });
}

app.get('/', function(request, response) {
  response.send('Cist!');
});

app.post('*', saveFile);
app.put('*', saveFile);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

