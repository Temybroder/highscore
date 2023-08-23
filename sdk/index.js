const fs = require("fs");

const virtualization = require("./Virtualization");
const serverWriter = require("./serverWriter");

require("dotenv").config();

// VIRTUALIZATION MANAGER
// const virtualization = require('./Virtualization');
// virtualization()

module.exports = {
    virtualizer: virtualization,
    serverWriter: serverWriter
}