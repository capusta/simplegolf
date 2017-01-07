console.log("starting golf app ... just for testing loki");
// initialize loki
var loki = require('lokijs');
// looking good.  initializing db
var options = {autosave: true}; // quick autosave ... cuuz .. fuuck
var db = new loki('data/golf.json', options);

// I guess we'll start with users
var users = db.addCollection('users');
users.insert({name:'User one', hole: 8, score: 2});
users.insert({name:'User two', hole: 7, score: 1});
// db remains open, listening ... cuz ... autosave ... lets close it,
// bring on the IO
db.close();
console.log("databse is closed");

var one = users.find( {'name':'User one'});
console.log(one);
console.log("this should have found something ");

var one_bad = users.find( {'name':'User onezzz'});
// nope, did not find it.  we'll do should.js later on for testing
console.log(one_bad + " wuut ... above line should be from line 19");