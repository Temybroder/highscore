/*
 * Unit Tests
 *
 */

// Dependencies
// var helpers = require('../helpers/helpers.js');
const h = require("../helpers/helpers")
var loggerLib = require("../Logging/logger.js")
var assert = require('assert');
var root = require('../app');

// Holder for Tests
var unit = {};


// Assert that the getANumber function is returning a number
unit['helpers.getANumber should return a number'] = function(done){
  var val = h.helpers.getANumber();
  assert.equal(typeof(val), 'number');
  done();
};

// // The main init() function should be able to run without throwing.
// unit['root.starter.init should start without throwing'] = function(done){
//   assert.doesNotThrow(function(){
//     root.starter.init(function(err){
//       done();
//     })
//   },TypeError);
// };


// Assert that the getANumber function is returning 1
unit['helpers.getANumber should return 1'] = function(done){
  var val = h.helpers.getANumber();
  assert.equal(val, 1);
  done();
};

// Assert that the getANumber function is returning 2
// unit['helpers.getNumberOne should return 2'] = function(done){
//   var val = helpers.getANumber();
//   assert.equal(val, 2);
//   done();
// };

// // Logs.list should callback an array and a false error
  // unit['loggerLib.list should callback a false error and an array of log names'] = function(done){
  //   loggerLib.list(true,function(err,logFileNames){
  //       assert.equal(err, false);
  //       assert.ok(logFileNames instanceof Array);
  //       assert.ok(logFileNames.length > 1);
  //       done();
  //   });
  // };

// // Logs.truncate should not throw if the logId doesnt exist
// unit['loggerLib.truncate should not throw if the logId does not exist, should callback an error instead'] = function(done){
//   assert.doesNotThrow(function(){
//     loggerLib.truncate('I do not exist',function(err){
//       assert.ok(err);
//       done();
//     })
//   },TypeError);
// };


// Export the tests to the runner
module.exports = unit;
