global.logger = require("./lib/logger.js");
global.logger.log("Starting app");

var handler = require("./lib/handler.js");
handler.load("path","collection");