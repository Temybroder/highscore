const fs = require("fs");
const fsx = require("fs-extra");
let events = require('events');
let eventEmitter = new events.EventEmitter();

const path = require("path");

const baseDir = path.join(__dirname,'/../');

const serverWriter = {};

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}


// baseDir + "/createdVDServers/" + "app.js"
 

// const serverData = 
// `const server${i} = {
// const express = require('express');
// const app = express();
// const expressLayouts = require('express-ejs-layouts');

// const path = require("path");

// app.use(expressLayouts);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, './public/views'));

// // MASTER DATABASE CONNECTION
// const dbMain = require('./vars/db');
  
// async function _connectDb () {
//   try {
//    // await dbMain.connect();
//      } catch (error) {
//      console.log(error)
//   }
// }

// // Express session
// app.use(
//     session({
//       secret: process.env.session_secret,
//       resave: true,
//       saveUninitialized: true,
//       // store: 
//      })
//    );
  
// // Express body parser
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/', require('./routes/index'));
// const PORT = 7000;
// app.listen(PORT, console.log(Express Server started on port ${PORT + 1}. Databases Started));
// }
// module.exports = server${i}
// `
 let firstData =  `const startAllCreatedServers = (platform, mediaurl, num_of_servers) => {`;
 let SecondData =  `let server = require('../createdVDServers/server.js');
 server(platform, mediaurl, num_of_servers);`


 function startVDServerEngine (platform, mediaurl, num_of_servers) {
    // try {
        let startAllCreatedVDServers = require("./newVDSIndex");
        console.log("Logging startAllCreatedVDServers as .... ");
        console.log("About to Start all created VD Servers  " + platform + " " + mediaurl + " " + num_of_servers)
        startAllCreatedVDServers(platform, mediaurl, num_of_servers)   
    // } catch (error) {
    //     console.log("ERROR STARTING UP THE VD SERVERS IS " + error)
    // }
}

// Listen for call to fire spinVDServer event
serverWriter.spinEventManager = (platform, mediaurl, num_of_servers) => {
    startVDServerEngine(platform, mediaurl, num_of_servers)
    console.log("FIRED EVENT TO SPIN VD SERVERS")
    // serverWriter.startVDServerEngine(platform, mediaurl, num_of_servers);
}


// FUNCTION 1
serverWriter.initVirtualizationProcess = (platform, mediaurl, num_of_servers) => {

// Function 2 -Write the Servers to new file
serverWriter.createVDServers = async (platform, mediaurl, num_of_servers) => {
    if(num_of_servers > 0){
        // If num of servers to be created is greater than 0, then create the Index file for all the Servers first
        fs.writeFile(baseDir + "/sdk/" + "newVDSIndex.js",""
        , function(error){
        if (error){
            console.log("%cCreation of Servers Index File Operation Failed")
            }
        }
    )
    function formatUrl (ytUrl) {  
        let medurl = ytUrl.split("=");  
        let medredirecturl = medurl[1];
        return medredirecturl;  
     }  
    const finalUrl = formatUrl(mediaurl); 
        // Write Server Data into individual Server files710'
        for(let i=0; i<num_of_servers; i++){
            const PORT = 5000 + (50 * i);
           let urlParam = finalUrl + "," + "1";
           
           await fs.writeFile(baseDir + "/createdVDServers/" + `vdServer${i}.js`,
           `const express = require('express'); \r\n
                const app = express(); \r\n
                const fetch = ( ...args) => {  \r\n
                    import('node-fetch').then(({ default: fetch }) => fetch(...args));  \r\n
                }  \r\n
                const open = ( ...args) => {  \r\n
                    import('open').then(({ default: open }) => open(...args));  \r\n
                }  \r\n
               
                const server${i} = ( num_of_servers) => { \r\n

                    const expressLayouts = require('express-ejs-layouts'); \r\n
                    
                    const path = require("path"); \r\n
                    
                    const virtualization = require("../sdk/Virtualization"); \r\n
                    app.use(expressLayouts); \r\n
                    app.use(express.static('public'));  \r\n
                    app.set('view engine', 'ejs'); \r\n
                    app.set('views', path.join(__dirname, '../public/views')); \r\n
                    
                    // MASTER DATABASE CONNECTION \r\n
                    const dbMain = require('../vars/db'); \r\n
                    
                    async function _connectDb () { \r\n
                    try { \r\n
                    // await dbMain.connect(); \r\n
                        } catch (error) { \r\n
                        console.log(error) \r\n
                    } \r\n
                    } \r\n 
                    let mediaurl = "${mediaurl}"; \r\n
                    let platform = "${platform}"; \r\n
                    \r\n
                    // Routes \r\n
                    app.use('/', require('../routes/index')); \r\n
                    app.get('/welcome', (req, res) => { \r\n
                        res.send("Index route on this VD Server Number ${i}"); \r\n
                    }); \r\n
                    \r\n
                    
                    console.log("OPEN LINE SKIPPED");
                    // Express body parser \r\n
                    app.use(express.urlencoded({ extended: true })); \r\n
                    \r\n
                    
                    const PORT = ${5000 + (50 * i)}; \r\n

                    function getRandomInteger(min, max) {  \r\n
                        return Math.floor(Math.random() * (max - min + 1)) + min;  \r\n
                      }  \r\n
                      
                      function callUrlOpenAfterRandomDelay() { \r\n
                        const randomNumber = getRandomInteger(1, 3); \r\n
                        console.log("Generated random number:", randomNumber); \r\n
                      
                        const delayInMilliseconds = randomNumber * 60 * 1000; // Convert to milliseconds \r\n
                      
                        setTimeout(() => {  \r\n
                            let urlParam = "blbslHDgceY" + "," + "5000" + "," + randomNumber.toString()    \r\n

                            open('https://silver-parrot-wear.cyclic.cloud/stream/blbslHDgceY,1');   \r\n
                        }, delayInMilliseconds);  \r\n
                      }  \r\n
                      
                      function urlOpen() {  \r\n
                        let urlParam = "${finalUrl}" + "," + "${PORT}" + "," + randomNumber.toString()   \r\n
                        open('https://silver-parrot-wear.cyclic.cloud/stream/${urlParam}');  \r\n
                      }  \r\n
                      
                      callUrlOpenAfterRandomDelay();  \r\n
                      
                    app.listen(PORT, async () => { \r\n
                        console.log("Virtual Device in Process ${process.pid}. Express Server-${i} started on port ${PORT}. Databases Started") \r\n
                        } \r\n
                        ); \r\n
                    } \r\n
                    module.exports = server${i}`
                , function(error){
                if (error){
                    console.log("%cWrite Server Data Operation Failed", "color: red")
                }
            })
        }

            // Function 3 - to check if server files have been created
            const checkVDServerFilesCreated = async (platform, mediaurl, num_of_servers) => {
               await fs.access(baseDir + "/createdVDServers/" + "vdServer0.js", fs.constants.F_OK, function (err){
                if (err){
                    console.log("Server files check failed ===> Server directory likely empty")
                    } else {
                       console.log("Server files successfully created");
                    }
                })
            }
            // Function 3 call
            checkVDServerFilesCreated(platform, mediaurl, num_of_servers);

    }
}

    serverWriter.updateVDServerIndexFile = (platform, mediaurl, num_of_servers) => {
        // Append the first line of Code 
        for(let i = 0; i< num_of_servers;i++){
            fs.appendFile(baseDir + "/sdk/" + "newVDSIndex.js",
            `let vdServer${i} = require('../createdVDServers/vdServer${i}'); \r\n` + "\r\n"
            , function(error){
            if (error){
                console.log("%First Write Data to Servers Index File Operation Failed", "color: red")
                }
            }
        )
        }
         fs.appendFile(baseDir + "/sdk/" + "newVDSIndex.js",
            `let startAllCreatedVDServers = (platform, mediaurl, num_of_servers) => {` + "\r\n"
            , function(error){
            if (error){
                console.log("%cWrite Data to Servers Index File Operation Failed", "color: red")
                }
            }
        )
         function updateFile(){
        // Loop to append the lines for requiring the Server Files Created
        for(let i=0; i < num_of_servers; i++){
            if(num_of_servers - i == 1){
                fs.appendFile(baseDir + "/sdk/" + "newVDSIndex.js", 
               ` vdServer${i}(platform, mediaurl, num_of_servers); \r\n
                    } \r\n
                    module.exports = startAllCreatedVDServers;`
                    , function(error){
                        if (error){
                            console.log("Final Update to VD Servers Index File-Data Operation Failed")
                         }
                    }
                )
            } else { 
                  fs.appendFile(baseDir + "/sdk/" + "newVDSIndex.js", 
                    `\r\n
                     vdServer${i}(platform, mediaurl, num_of_servers);\r\n`
                     , function(error){
                            if (error){
                                console.log("%cSecond stream of Update to VD Servers Index File-Data Operation Failed", "color: red")
                            }
                        }
                    )
              }
        }
    }
        updateFile()
       // fs.close();
        // Attempt to start Servers' Engine after 5 seconds
        // console.log("%cPreparing to start Engine for VD Servers Created and Spin up VDs", "font-size: larger; color: green")
        // startVDServerEngine(platform, mediaurl, num_of_servers)
         fs.access(baseDir + "/sdk/" + "newVDSIndex.js", fs.constants.F_OK, function (err){
            if (err){
                console.log("INDEX FILE FOR VDS check failed ===> Server directory likely empty")
                } else {
                   console.log("INDEX FILE FOR VDS successfully checked and Confirmed generated");
                }
         })
    }
    


    const runAllProcesses = new Promise((resolve, reject) => {
        resolve(console.log("Commencing Process Execution +++++ "))
    } )
    
    runAllProcesses
    .then(()=> {
        serverWriter.createVDServers(platform, mediaurl, num_of_servers);
    })
    .then(()=> {
        serverWriter.updateVDServerIndexFile(platform, mediaurl, num_of_servers);
    })
    .catch((error)=> {
            console.log("Encountered error is  ===>  " + error)
    })
    return;
}



// END ALL VIRTUALIZATIOON
serverWriter.endVirtualization = () => {
deleteVDServers = () => {
        fsx.emptyDir(baseDir + "/createdVDServers/")
        .then(()=> {
            console.log("Virtual Devices Server directory emptied")
        })
        .catch(err => {
            console.log(err)
        })
    }
    deleteVDServers();
}

module.exports = serverWriter;
