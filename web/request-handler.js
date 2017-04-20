var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('../web/http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET') {
    if(req.url === '/') {
    fs.readFile(archive.paths.siteAssets + '/index.html', (error, data) => {
      if (error) {
        res.writeHead(404, http.headers);
        res.end();
      } else {
        res.writeHead(200, http.headers);
        res.end(data);
      }
    });      
  } else {
    fs.readFile(archive.paths.archivedSites + '/' + req.url, (error, data) => {
      if (error) {
        res.writeHead(404, http.headers);
        res.end();
      } else {
        res.writeHead(200, http.headers);
        res.end(data);
      }
    });
   }
  } else if (req.method === 'POST'){
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    })
    .on('end', function() {
      body = body.slice(4);
      fs.readFile(archive.paths.list, 'utf-8', (error, data) => {
        if (error) {
          console.log('Error!');
        } else {
          archive.isUrlInList(body, (exists) => {
            if (!exists) {
              archive.addUrlToList(body + '\n', function(){
                res.writeHead(302, http.headers);
                res.end();
              });
            }
          });
        }
      }); 
    });
  }
};
