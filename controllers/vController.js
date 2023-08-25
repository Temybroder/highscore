
const virtualBox = require("../sdk/index");

const path = require("path");

const baseDir = path.join(__dirname,'/../');

const fs = require("fs-extra");

const helpLib = require("../helpers/helpers");


const spinUp = async (req, res) => {
  
    try {
     const {platform, mediaurl, vdnumber} = req.body;
     let errors = [];
      let user = {
      name: "Sammie",
      email: "sammie@gmail.com"
  }
     if (vdnumber > 5){
      errors.push({msg: "Choose number of VDs less than 6"})
     }
     if (errors.length > 0) {
      req.flash('success_msg', 'Choose number of VDs less than 6');
        res.render('dashboard', {
          errors,
          platform,
          mediaurl,
          vdnumber,
          user: user
        });
    } else {
     helpLib.helpers.checkMediaUrl(mediaurl)
     .then((urlCheckResult) => {
      console.log("URL CHECK RESPONSE IS " + urlCheckResult)
      if(urlCheckResult == true){
      let num_of_servers = vdnumber;
       virtualBox.serverWriter.initVirtualizationProcess(platform, mediaurl, num_of_servers);
      // split mediaurl on the 30th character, removing "https://www.youtube.com/watch?"
      let medurl = mediaurl.split("?");
      let medredirecturl = medurl[1];
      console.log("Stripped url is " + medredirecturl);
      console.log("REDIRECTING TO URL: " + "/spinvds/"+`${platform}` + "/" + `${medredirecturl}` + "/" + `${vdnumber}`)
      // Combine all three params into single string (Because sending as single strings is giving problems)
      // let tempMedRedirect = medredirecturl.subString(2);
      let combinedParams = platform.concat("." + medredirecturl.concat("." + num_of_servers))
      res.redirect("/mid/"+`${combinedParams}`)
      return;
        }
  else {
          res.status(400).json("Invalid Media Url Input")
          return;
       }
     })
     .catch((error) => {
      console.log("An unknown error was Caught " + error)
      return;
     })}

    }
    catch (error){
      console.log("Caught error is " + error)
         res.status(500).send(error)
         return;
     }
 }


 const startVD = async (req, res) => {
  let user = {
    name: "Emmy Emby",
    email: "emmy@gmail.com"
}
   let splitParams = req.params.combinedParams.split(",");
  console.log("START VD SPLIT PARAMS IS " + splitParams)
   let platform = splitParams[0]
   let medredirecturl = splitParams[1].substring(2);
   let vdnumber = splitParams[2]
 
    let mediaUrl = "https://www.youtube.com/embed/".concat(medredirecturl);
    const num_of_servers = vdnumber;
    try {
      console.log("Attempting to start the Virtual Device Servers")
     await virtualBox.serverWriter.spinEventManager(platform, mediaUrl, num_of_servers);
     res.redirect("/report/"+`${platform}` + "/" + `${medredirecturl}` + "/" + `${vdnumber}`);
     return;
    }
    catch (error){
      res.send("There was an ERROR ===  " + error);
      return;
    }
  }


module.exports = {
    spinUp: spinUp,
    startVD: startVD
}
