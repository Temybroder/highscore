/**
 *   HELPER FUNCTIONS
 * 1. Testyoutube url before sending it to the rest of the procedure
 */

const axios = require('axios')

let helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

helpers.checkMediaUrl =  async (url) => {
 try {
    testedUrl = typeof(url) == 'string' && url.trim().length > 0 ? url.trim() : false;

              if(testedUrl != false){
                console.log("temy")
                  // Make a request to the given endpoint
                  const response = await axios.get(testedUrl)
                      // handle success
                      if((response.status > 199) && (response.status < 300)){
                        console.log("URL ENDPOINT TEST IS " + response.status);
                    return true
                          } else {
                          // handle failure
                          console.log("Axios call was unsuccessful ")
                    return false;
                            }
                          //}
                        } else {
                    return false
                      }
                    
       } catch (error) {
        console.error("Ther was an unknown error");
        return false
      }
    }


// Sample for testing that simply returns a number
helpers.getANumber = function(){
  return 1;
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for(i = 1; i <= strLength; i++) {
        // Get a random charactert from the possibleCharacters string
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        // Append this character to the string
        str+=randomCharacter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};

module.exports = {
    helpers: helpers
}