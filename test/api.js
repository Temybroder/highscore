/*
 * API Tests
 *
 */

// Dependencies
var assert = require('assert');
var http = require('http');
var config = require('../config/config');

// Holder for Tests
var api = {};

// Helpers
var helpers = {};
helpers.makeGetRequest = function(path,callback){
  // Configure the request details
  var requestDetails = {
    'protocol' : 'http:',
    'hostname' : 'localhost',
    'port' : 7000,
    'method' : 'GET',
    'path' : path,
    'headers' : {
      'Content-Type' : 'application/json'
    }
  };

  // Send the request
  var req = http.request(requestDetails,function(res){
      callback(res);
  });
  req.end();
};


// Make a request to /ping
api['/ping should respond to GET with 200'] = function(done){
  helpers.makeGetRequest('/testw',function(res){
    assert.equal(res.statusCode,200);
    done();
  });
};

// Make a request to /api/users
api['/spin should respond to GET with 200'] = function(done){
  helpers.makeGetRequest('/spin',function(res){
    assert.equal(res.statusCode,200);
    done();
  });
};

// Make a request to a random path
api['A random path should respond to GET with 404'] = function(done){
  helpers.makeGetRequest('/this/path/shouldnt/exist',function(res){
    assert.equal(res.statusCode,404);
    done();
  });
};

// Export the tests to the runner
module.exports = api;
