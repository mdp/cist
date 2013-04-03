var express = require('express');
var request = require('request');

var app = express.createServer();
app.use(express.logger())

app.get('/', function(request, response) {
  response.send('Cist!');
});

app.post('*', function(request, response) {
  console.log(request.url)
  var fileName = request.url.match(/\/(.*)$/)[1]

  request.setEncoding('utf-8')
  var content = ''
  request.on('data',function(chunk){
    content = content + chunk;
  });
  request.on('end',function(){
    createGist(content, fileName, function(err, resp){
      console.log(resp);
      response.send(resp['html_url'] + "\n");
    });
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

var gistUrl = function(){
  var url = "https://api.github.com/gists";
  if(process.env['CLIENT_ID']){
    url = url + "?client_id=" +
      process.env['CLIENT_ID'] + "&client_secret" +
      process.env['CLIENT_SECRET'];
  }
  return url;
}

var createGist = function(content, fileName, callback) {
  var json = {
    "description": "Cist created gist",
    "public": false,
    "files": {
    }
  }
  json['files'][fileName] = {
    "content": content
  }
  console.log(content);
  request.post(gistUrl(), {json:json}, function(err, res, body){
    callback(err, body);
  });
}
