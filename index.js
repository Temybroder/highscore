const root = require("./app");
const w = require("./bg_workers");
const c = require("./alertSystem/cliRepl")

c.cli.init();
w.workers.init();
root.starter.init();