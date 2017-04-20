var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(error, data) {
    if (error) {
      consonle.log('Error!');
    }
    var data = data.split('\n');
    return callback(data);
  })
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    callback(data.includes(url))
  })
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, 'utf-8', callback);
};

exports.isUrlArchived = function(url, callback) {
  fs.access(exports.paths.archivedSites + '/' + url, (error) => {
    callback(error ? false : true);
  }) 
};

exports.downloadUrls = function(urls) {
  //takes in an array of urls
  //read that array of urls
  for(var i = 0; i < urls.length; i++) {
    fs.writeFile(exports.paths.archivedSites + '/' + urls[i], data = '', (error) => {
      if(error){
        throw error;
      }
      console.log('File Saved!');
    })
  }
  //write the files to archivedSites 
};
