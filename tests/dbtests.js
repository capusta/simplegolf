global.debug = true; // can run various code in debug mode
var logger = require('../lib/logger.js');
logger.log("ok: library loaded");
var loki = require('lokijs');
logger.log("ok: loki db loaded");

// Loki specific things:
var options = {autosave: true}; // quick autosave ... cuuz .. fuuck
var db = new loki('data/golf.json', options);

// I guess we'll start with users
var players = db.addCollection('players');
players.insert({name:'User one', hole: 8, score: 2});
players.insert({name:'User two', hole: 7, score: 1});
// db remains open, listening ... cuz ... autosave ... lets close it,
// bring on the IO
db.close();
logger.log("ok: databse is closed");

var one = players.find( {'name':'User one'});
logger.log("ok" + JSON.stringify(one));
logger.log("ok: above should have found something ");

var one_bad = players.find( {'name':'User onezzz'});
// nope, did not find it.  we'll do should.js later on for testing
logger.log(one_bad + "ok: this should be the only text");

global.debug = false;
logger.log("error: this line should not be displayed");
