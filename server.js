global.logger = require("./lib/logger.js");
global.logger.log("Starting app");

// Starting the App
var express = require("express");
var app     = express();
var port    = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip      = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

// Router Stuff
app.use('/game',require('./routes/games'));
app.use('/',require("./routes/public"));

app.listen(port,ip,function(){
    global.logger.log("app listening on "+ip+":"+port);
});

// Don't need the supporting libraries just yet
//var handler = require("./lib/handler.js");
//handler.load("path","collection");