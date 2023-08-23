const virtualMachine = require("node:vm");

const virtualization = require('./sdk/Virtualization');
virtualization.initiatePlatform(
  // "youtube", "https://www.youtube.com/watch?v=KZ3tIGHU314"
) 

const virtualDevices = () => {  
//  Business Logic
// Every Virtual Device is going to run in a separate context

// The contexts are the several instances spun by the Virtual Machine

// The Virtual Machine is the host machine for all the Contexts (VDs)

// 

const context = vm.createContext({ a: 1 });
virtualMachine.measureMemory({ mode: 'detailed', execution: 'eager' })
  .then((result) => {
    // Reference the context here so that it won't be GC'ed
    // until the measurement is complete.
    console.log(context.a);
    // {
    //   total: {
    //     jsMemoryEstimate: 2574732,
    //     jsMemoryRange: [ 2574732, 2904372 ]
    //   },
    //   current: {
    //     jsMemoryEstimate: 2438996,
    //     jsMemoryRange: [ 2438996, 2768636 ]
    //   },
    //   other: [
    //     {
    //       jsMemoryEstimate: 135736,
    //       jsMemoryRange: [ 135736, 465376 ]
    //     }
    //   ]
    // }
    console.log(result);
  }); 


  const contextObject = { virtualization };

  virtualMachine.createContext(contextObject);


// Tasks 
/**
 *  1. Function to Call the general initiation for this activity, plus all the necessary functions
 *  2. Function to start the Virtualization Process (VDs) for stated number of VDs
 *  2. Function to Stop the running Virtualization Process (VDs)
 *  3. 
 */

}

module.exports = virtualDevices;