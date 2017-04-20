var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('../web/http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET' && req.url === '/') {
    console.log(archive.paths.siteAssets)
    fs.readFile(archive.paths.siteAssets + '/index.html', (error, data) => {
      if (error) {
        res.writeHead(404, http.headers);
        res.end();
      } else {
        res.writeHead(200, http.headers);
        res.end(data);
      }
    })
  } else {
    fs.readFile(archive.paths.archivedSites + '/' + req.url, (error, data) => {
      if (error) {
        res.writeHead(404, http.headers);
        res.end();
      } else {
        res.writeHead(200, http.headers);
        res.end(data);
      }
    })
  } 

  if (req.method === 'POST'){
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    })
    .on('end', function() {
     //JSON.stringify(data);
    })


  }
};

