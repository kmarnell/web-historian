var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('../web/http-helpers.js');
// require more modules/folders here!

// var sendResponse = function(res, data, statusCode) {
//   statusCode = statusCode || 200;
//   res.writeHead(statusCode, http.headers);
//   res.end(JSON.stringify(data)); //???
// };

var actions = {
  GET: function(req, res) {
      fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, data) { //not bringing css along??
      if(err) {
        res.writeHead(404, http.headers);
        res.end();
      } else {
        res.writeHead(200, http.headers);
        res.end(data);
      }
    })
    
},

  POST: function(req, res) {
    fs.writeFile(__dirname + '/sites.txt', '/' + req.url, function(err, data) {
      if(err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }
}



exports.handleRequest = function (req, res) {

  if (req.method === "GET") {
      actions[req.method](req, res);
  } else {
    if(req.method === "POST") {
      actions[req.method](req, res);
    }
  }


  //res.end(archive.paths.list); ????

};

