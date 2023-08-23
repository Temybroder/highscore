const cron = require('node-cron');
const fs = require("fs");
const sound = require("sound-play");
const os = require('os');
const pidusage = require('pidusage');
const logging = require("./Logging/logger");
const timeStamp = require("./utils/timeStamp");


var path = require('path');
let baseDir = path.join(__dirname,'/logs/');
let workers = {};

const sirenPath = path.join(__dirname, "/resources/siren.mp3");


/**
 * WRITING AVAILABILITY LOGS: track system performance, uptime, and availability
 * RESOURCE LOGS: provide information about connectivity issues and capacity limits
 * THREAT LOGS: system, file, or application traffic that matches a predefined security 
 * profile within a firewall
 */
const timeStr =  timeStamp.timeHelper.unformattedCurrentTimeAndDate();
const formattedTimeStr = timeStamp.timeHelper.currentTimeAndDate();

      const memoryUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();

      // Get additional system-level metrics using the 'os' module
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const loadAverage = os.loadavg();
      const uptime = os.uptime();


  workers.systemHealthLogger = cron.schedule('*/25 * * * *', () =>  {
    // const timeStr = timeStamp.timeHelper.currentTimeAndDate();
    let memUsage = JSON.stringify(memoryUsage);
    let cpuUsageData = JSON.stringify(cpuUsage)
    //console.log("Timestamp Value is " + formattedTimeStr);

    pidusage(process.pid, (err, stats) => {
      if (err) {
      //sound.play(sirenPath);
      console.error('Error getting process usage:', err);
      return;
      } else  {
              let logData = 
              `---------------------------------'\r\n
                LOG METADATA ==> TimeStamp: ${formattedTimeStr} \r\n
                Memory Usage = ${memUsage} \r\n
                CPU Usage = ${cpuUsageData}\r\n
                Total Memory = ${totalMemory}\r\n
                Free Memory = ${freeMemory}\r\n
                Load Average = ${loadAverage}\r\n
                Uptime = ${uptime} \r\n
                Process CPU Usage = ${stats.cpu}
                Process Memory Usage = ${stats.memory}
                ---------------------------------'\r\n
            `
            //  logging.loggerLib.writeNewFile(baseDir + timeStr + ".log", logData)
        
              fs.writeFile(baseDir +"/"+ timeStr + ".log", logData,
               function(error){
               if (error){
                sound.play(sirenPath);
                  console.log("Creation of Log File Operation Failed" + error)
                  } else  {
                    console.log(`Write to New Log File + ${baseDir}${timeStr}.js  Successful`)
                  }
              })
            
      }
             
  });


    let logDatas = 
             `---------------------------------'\r\n
               LOG METADATA ==> TimeStamp: ${formattedTimeStr} \r\n
               Memory Usage = ${memUsage} \r\n
               CPU Usage = ${cpuUsageData}\r\n
               Total Memory = ${totalMemory}\r\n
               Free Memory = ${freeMemory}\r\n
               Load Average = ${loadAverage}\r\n
               Uptime = ${uptime} \r\n
              
               ---------------------------------'\r\n
            `
      // console.log('\x1b[35m%s\x1b[0m', 'LOGGING SYSTEM HEALTH DATA' + logData);
     
      // // logging.loggerLib.writeNewFile(baseDir + `${timeStr}.txt`, logData)
  
      //  fs.writeFile(baseDir + timeStr + ".log", logData,
      //   function(error){
      //   if (error){
      //      console.log("Creation of Log File Operation Failed" + error)
      //      } else  {
      //        console.log(`Write to New Log File + ${baseDir}${timeStr}.js  Successful`)
      //      }
      //  })
      
   
    }, {
      scheduled: false
    });
  


workers.systemHealthCheck = cron.schedule('*/30 * * * *', () =>  {

        // Get process-specific metrics using the 'pidusage' module
        pidusage(process.pid, (err, stats) => {
            if (err) {
            sound.play(sirenPath);
            console.error('Error getting process usage:', + err);
            return;
            } 
            console.log("-> System Health Check starting now at " + new Date() + " and Logging to System Performance log"); 
            console.log('Memory Usage:', memoryUsage);
            console.log('CPU Usage:', cpuUsage);
            console.log('Total Memory:', totalMemory);
            console.log('Free Memory:', freeMemory);
            console.log('Load Average:', loadAverage);
            console.log('Uptime:', uptime);
            console.log('Process CPU Usage:', stats.cpu);
            console.log('Process Memory Usage:', stats.memory);
            console.log('---------------------------------');
        });

    }, {
        scheduled: false
  });

  workers.modulesHealthCheck = cron.schedule('* * * * *', () =>  {
   // console.log('\x1b[35m%s\x1b[0m', 'SYSTEM RUNNING...');
  }, {
    scheduled: false
  });

 
// workers.runAllChecks = () => {

//     workers.systemHealthCheck.start();
//     workers.ModulesHealthCheck.start();
//     workers.systemHealthLogger.start();

// }


workers.init = () => {
  //workers.systemHealthLogger.start();
  //workers.systemHealthCheck.start();
  //workers.modulesHealthCheck.start();
  // Send to console, in yellow
  //console.log('\x1b[33m%s\x1b[0m', 'Background workers now running');

}

module.exports = {
    workers: workers
}