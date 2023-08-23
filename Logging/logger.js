/*
 * Library for all Logging activity
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');


// Container for module (to be exported)
var loggerLib = {};
var lib = {};

// Base directory for all Log data
lib.baseDir = path.join(__dirname,'/../logging/logs');
let baseDir = path.join(__dirname,'/../logging/');



// Write new file
loggerLib.writeNewFile = function(fileDir, writeData){
      fs.writeFile(fileDir, writeData,
       function(error){
      if (error){
            console.log("Creation of Log File Operation Failed" + error)
            } else  {
              console.log(`Write to New Log File + ${fileDir}  Successful`)
            }
        }
    )
}

loggerLib.updateFile = function(file, writeData){
  fs.appendFile(baseDir + file + ".log", writeData,
   function(error){
  if (error){
        console.log(`Update of Log File + ${baseDir + file}.log Failed`)
        } else {
          console.log(`Update of Log File + ${baseDir + file}.log was Successful`)
            }
        }
    )
}


loggerLib.listLogs = (includeCompressedLogs, callback) => {
    fs.access(baseDir + "/logging/" + "/logs", fs.constants.F_OK, function(err, data){
      if(!err && data && data.length > 0){
        var trimmedFileNames = [];
        data.forEach(function(fileName){
  
          // Add the .log files
          if(fileName.indexOf('.log') > -1){
            trimmedFileNames.push(fileName.replace('.log',''));
          }
          // Add the .gz files
          if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
            trimmedFileNames.push(fileName.replace('.gz.b64',''));
          }
        });
        callback(false,trimmedFileNames);
      } else {
        callback(err,data);
        }

     })
  }



// Compress the contents of one .log file into a .gz.b64 file within the same directory
loggerLib.compress = function(logId,newFileId,callback){
  var sourceFile = logId+'.log';
  var destFile = newFileId+'.gz.b64';

  // Read the source file
  fs.readFile(lib.baseDir+sourceFile, 'utf8', function(err,inputString){
    if(!err && inputString){
      // Compress the data using gzip
      zlib.gzip(inputString,function(err,buffer){
        if(!err && buffer){
          // Send the data to the destination file
          fs.open(lib.baseDir+destFile, 'wx', function(err, fileDescriptor){
            if(!err && fileDescriptor){
              // Write to the destination file
              fs.writeFile(fileDescriptor, buffer.toString('base64'),function(err){
                if(!err){
                  // Close the destination file
                  fs.close(fileDescriptor,function(err){
                    if(!err){
                      callback(false);
                    } else {
                      callback(err);
                    }
                  });
                } else {
                  callback(err);
                }
              });
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });

    } else {
      callback(err);
    }
  });
};


// List all the logs, and optionally include the compressed logs
loggerLib.list = function(includeCompressedLogs,callback){
  fs.readdir(lib.baseDir, function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){

        // Add the .log files
        if(fileName.indexOf('.log') > -1){
          trimmedFileNames.push(fileName.replace('.log',''));
        }
        // Add the .gz files
        if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
          trimmedFileNames.push(fileName.replace('.gz.b64',''));
        }

      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};


// Append a string to a file. Create the file if it does not exist
loggerLib.append = function(file,str,callback){
  // Open the file for appending
  fs.open(lib.baseDir+file+'.log', 'a', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Append to file and close it
      fs.appendFile(fileDescriptor, str+'\n',function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing file that was being appended');
            }
          });
        } else {
          callback('Error appending to file');
        }
      });
    } else {
      callback('Could not open file for appending');
    }
  });
};


// Decompress the contents of a .gz file into a string variable
loggerLib.decompress = function(fileId,callback){
  var fileName = fileId+'.gz.b64';
  fs.readFile(lib.baseDir+fileName, 'utf8', function(err,str){
    if(!err && str){
      // Inflate the data
      var inputBuffer = Buffer.from(str, 'base64');
      zlib.unzip(inputBuffer,function(err,outputBuffer){
        if(!err && outputBuffer){
          // Callback
          var str = outputBuffer.toString();
          callback(false,str);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

// Truncate a log file
loggerLib.truncate = function(logId,callback){
  fs.truncate(lib.baseDir+logId+'.log', 0, function(err){
    if(!err){
      callback(false);
    } else {
      callback(err);
    }
  });
};

// Export the module
module.exports = {
  loggerLib: loggerLib
};